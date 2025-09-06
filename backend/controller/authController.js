import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

function getFullName(firstName,lastName){
    const fullName = [firstName, lastName].filter(Boolean).join(' '); // handles nulls safely
    return fullName;
}
export const editProfile = async (req, res) => {
    const userId = parseInt(req.params.id);
    const {
      firstName, lastName, email, country, city, jobPosition,
      company, bio, twitterUrl, linkedinUrl, githubUrl, newPassword
    } = req.body;
  
    const dataToUpdate = {
    };

    // Only add fields if they're not empty
    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (email) dataToUpdate.email = email;
    if (country) dataToUpdate.country = country;
    if(city) dataToUpdate.city=city;
    if (jobPosition) dataToUpdate.jobPosition = jobPosition;
    if (company) dataToUpdate.company = company;
    if (bio) dataToUpdate.bio = bio;
    if (twitterUrl) dataToUpdate.twitterUrl = twitterUrl;
    if (linkedinUrl) dataToUpdate.linkedinUrl = linkedinUrl;
    if (githubUrl) dataToUpdate.githubUrl = githubUrl;
  
    //if firstName or lastName is updated,call helper function and update fullName
    if(firstName || lastName){
        const finalFirstName = firstName || res.locals.currentUser.firstName; //if firstName is not edited, use old firstName in database
        const finalLastName = lastName || res.locals.currentUser.lastName;//if lastName is not edited, use old lastName in database

        const fullName=getFullName(finalFirstName,finalLastName);
        dataToUpdate.name=fullName;
    }

    if (newPassword && newPassword.trim() !== "") {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      dataToUpdate.password = hashedPassword;
    }
    //console.log('req.file is:',req.file);
    if (req.file) {
      dataToUpdate.profilePictureUrl = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate
    });
  
    //console.log('updated user is:', updatedUser);
    req.flash('success','Profile is updated successfully!');
    res.redirect(`/auth/profile/edit/${userId}`); // or wherever your profile page is
};  

export const showEditProfile=async(req,res)=>{
    const currentUser=res.locals.currentUser;
    res.render('user/editProfile',{currentUser});
}
export const toggleFollow=async(req,res)=>{
    const authorToFollowId = parseInt(req.body.authorToFollowId); //you will get this id from fetch() in layout.ejs
    const currentUserId = req.session.userId; // Assuming you store user ID in session

    console.log("currentUserId:",currentUserId,",authorToFollowId:",authorToFollowId);
    try {
        // Check if already following
        const existingFollow = await prisma.userFollow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: currentUserId,
                    followingId: authorToFollowId,
                },
            },
        });

        if (existingFollow) { //if already following,unfollow it if user clicks unfollow btn
            // Unfollow
            await prisma.userFollow.delete({
                where: {
                    followerId_followingId: {
                        followerId: currentUserId,
                        followingId: authorToFollowId,
                    },
                },
            });
            res.json({ followed: false });
        } else {
            // Follow
            await prisma.userFollow.create({
                data: {
                    followerId: currentUserId,
                    followingId: authorToFollowId,
                },
            });
            res.json({followed:true});
        }
    } catch (error) {
        console.error('Error toggling follow:', error);
    }
}

export const showProfile=async (req,res)=>{
    let currentUser = res.locals.currentUser; //get user from res.locals
    console.log('current user:',currentUser);
    const profileUser=await prisma.user.findUnique({
        where:{id:parseInt(req.params.id)}, //need to know profile user id to get his info
        include:{
            _count:{
                select:{
                    posts:true,
                    followers:true,
                    following:true,
                }
            },
            followers:{
                select:{
                    followerId:true //to check if the currentUser is already following profileUser or not
                }
            },
            posts:{//to show all posts written by that user
                include:{
                    _count:{
                        select:{
                            likes:true, //to show no. of likes of that post
                            comments:true,  //to show comment count of that post
                        }
                    },
                    author:{
                        select:{
                            id:true,
                            profilePictureUrl:true,
                            followers:true,
                            name:true,
                        }
                    },
                    category:{
                        select:{
                            name:true, //to show category of that post
                        }
                    },
                    likes:{
                        select:{
                            authorId:true,
                        }
                    },
                    bookmarks:{
                        select:{
                            userId:true, //who bookmark this post
                        }
                    }
                }
            }
        }
    });
    res.render('user/profile',{profileUser,currentUser,getReadTime:res.locals.getReadTime,
    });
}

//this login method generates json web token by accepting email & password
export const login = async (req, res) => {
  const { email, password } = req.body;
  const SECRET=process.env.JWT_SECRET;

  const adminUser=await prisma.admin.findFirst({
    where:{email}
  })

  if (email !== adminUser.email) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, adminUser.password);
  if (!isMatch) return res.status(400).json({ error: "Password incorrect" });



  // Generate token
  const token = jwt.sign(
    {
    id: adminUser.id,
    name:adminUser.name,
    email: adminUser.email,
    role: adminUser.role,
    phoneNo:adminUser.phoneNo,
    status:adminUser.status,
    createdAt:adminUser.createdAt,
    updatedAt:adminUser.updatedAt,
  }
    , SECRET, { expiresIn: "1h" });

  res.json({ token });
};

export const register = async (req, res) => {
    const { name,email,password,phoneNo,role,status } = req.body;

    //to prevent duplicate email
    const existingAdmin=await prisma.admin.findFirst({
        where:{email}
    })
    
    if(existingAdmin){
        return res.status(409).json({
            error: "This email is already registered."
        }); 
    }

    // 1. Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        // 2. Save the admin with the HASHED password
        const admin = await prisma.admin.create({
            data: {
                name,
                email,
                password: hashedPassword, // Store the hashed password
                phoneNo,
                role,
                status
            },
        });
        
        return res.status(201).json(admin);
    } catch (error) {
       console.error("Prisma create error:", error);
        return res.status(400).json({ error: 'Failed to create admin.' });
    }
};