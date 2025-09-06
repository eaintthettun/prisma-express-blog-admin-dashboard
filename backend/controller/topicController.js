import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();


//to use this method across all topic methods
const getCategory=async (options = {}) => {
  const {
    where = {},         // custom filters (e.g. { slug: business }
  } = options;

  return await prisma.category.findFirst({
    where,
    include:{
      posts:{
        include:{
            author:{ //to show author profile
                include:{
                    followers:{
                        select:{ //to check if you already followed the user
                            followerId:true,
                        }
                    }
                }
            },
            likes: {
              select: { authorId: true }
            },
            comments: {
              include: {
                commentLikes: true,
                author: true
              },
              orderBy: {
                createdAt: 'asc'
              }
            },
            bookmarks: {
              select: {
                userId: true,
                postId: true
              }
            },
            _count: {
              select: {
                likes: true,
                comments: true
              }
            }
        }
    },
        _count:{
          select:{
              followedBy:true,
              posts:true,
          }
        }
    },
});
}

//to use this method across all topic methods
const getTopic=async(options = {}) => {
  const {
    where = {},         // custom filters (e.g. { slug: business }
  } = options;

  return await prisma.topic.findFirst({
    where,
    include:{
        posts:{
            include:{
                author:{ //to show author profile
                    include:{
                        followers:{
                            select:{ //to check if you already followed the user
                                followerId:true,
                            }
                        }
                    }
                },
                likes: {
                  select: { authorId: true }
                },
                comments: {
                  include: {
                    commentLikes: true,
                    author: true
                  },
                  orderBy: {
                    createdAt: 'asc'
                  }
                },
                bookmarks: {
                  select: {
                    userId: true,
                    postId: true
                  }
                },
                _count: {
                  select: {
                    likes: true,
                    comments: true
                  }
                }
            }
        },
        _count:{
            select:{
                followedBy:true,
                posts:true,
            }
        }
    },
});
}




export const showEditCategory=async(req,res)=>{
  const categoryId=req.params.id;
  const category=await getCategory({
          where:{
            id:categoryId
          }
  });
  res.json(category);
}

export const editCategory=async(req,res)=>{
  const {name,slug}=req.body;
    const updatedCategory=await prisma.category.update({
        where:{id:req.params.id}, //condition
        data:{name,slug} //form data
    });
    res.json(updatedCategory);
}

//this method search either topic or category
export const searchTopic=async(req,res)=>{
  const searchWord =req.query.searchWord.trim();
  const currentUser=res.locals.currentUser;

    if (searchWord !== "") {
      //check if it's category
      const isCategory = res.locals.categories.find(c => c.name.toLowerCase() === searchWord);
      
      //if it is category, get category obj and send it to UI
      if(isCategory){
        const category=await getCategory({
          where:{
            name:
            { contains: searchWord, mode: 'insensitive' } 
          }
        });
        return res.render('category/categoryOrTopicDetails',
            {isCategory,category,
              currentUser,
              getReadTime:res.locals.getReadTime});
      }else{ 
        const topic=await getTopic({
          where:{
            name:
            { contains: searchWord, mode: 'insensitive' } 
          }
        });
        return res.render('category/categoryOrTopicDetails',{isCategory,topic
          ,currentUser,getReadTime:res.locals.getReadTime});
      }
    }
}

export const listTopics=async(req,res)=>{
    const categories=await prisma.category.findMany({ //get both categories and topics
        include:{
            topics:{
                select:{
                    id:true,
                    name:true,
                    slug:true,
                }
            },
            posts:true,
            followedBy:true
        }
    });
    res.json(categories);
}

export const showTopic=async(req,res)=>{
    const currentUser=res.locals.currentUser;
    let isFollowed=false;
    let followerCount;
    //this id will either category id or topic id
    const slug=req.params.slug;
    //to know category or topic ==> need to check slug name
    const categories=res.locals.categories;  //get categories from local storage
    const isCategory = categories.find(c => c.slug === slug);
    if(isCategory){
      //get category first ,then you can call category.posts to get posts
        let category=await getCategory({where:{slug:slug}});

        if(currentUser){
          const followed = await prisma.categoryFollow.findFirst({
            where: {
              userId: currentUser.id,
              categoryId: category.id,
            },
          });

          if(followed){
            isFollowed=true;
          }

          followerCount = await prisma.categoryFollow.count({
            where: {
              categoryId: category.id,
            },
          });
        }
        return res.render('category/categoryOrTopicDetails',
            {isCategory,category,
              currentUser,
              getReadTime:res.locals.getReadTime,
              isFollowed,
              followerCount});
    }else{ //is not category so this is topic
        let topic=await getTopic({where:{slug:slug}});
        if(currentUser){
          const followed = await prisma.topicFollow.findFirst({
              where: {
                userId: currentUser.id,
                topicId: topic.id,
              },
            });

            if(followed){
              isFollowed=true;
            }
          
          followerCount = await prisma.topicFollow.count({
            where: {
              topicId: topic.id,
            },
          });
        }
        return res.render('category/categoryOrTopicDetails',{isCategory,topic
          ,currentUser,getReadTime:res.locals.getReadTime,isFollowed,followerCount});
    }
}  

export const toggleFollow=async(req,res)=>{
        const topicToFollowId = parseInt(req.params.topicId); //this id is from ajax api ${topicId}
        const currentUserId = req.session.userId;
      
        //console.log("currentUserId:", currentUserId, ", topicToFollowId:", topicToFollowId);
      
        try {
          const category=await prisma.category.findUnique({
            where:{
              id:topicToFollowId
            }
          });
          if(category){
            const existingFollow = await prisma.categoryFollow.findUnique({
              where: {
                userId_categoryId: {
                  userId: currentUserId,
                  categoryId: topicToFollowId,
                },
              },
            });
            
            if (existingFollow) {
              // Unfollow
              await prisma.categoryFollow.delete({
                where: {
                  userId_categoryId: {
                    userId: currentUserId,
                    topicId: topicToFollowId,
                  },
                },
              });
              const count = await prisma.category.count({
                where: { categoryId: topicToFollowId }
              });
              res.json({ followed: false, followersCount: count });
            } else {
              // Follow
              await prisma.categoryFollow.create({
                data: {
                  userId: currentUserId,
                  categoryId: topicToFollowId,
                },
              });
              const count = await prisma.categoryFollow.count({
                where: { categoryId: topicToFollowId }
              });
              res.json({ followed: true, followersCount: count });
            }
          }else{
            const existingFollow = await prisma.topicFollow.findUnique({
              where: {
                userId_topicId: {
                  userId: currentUserId,
                  topicId: topicToFollowId,
                },
              },
            });
            
            if (existingFollow) {
              // Unfollow
              await prisma.topicFollow.delete({
                where: {
                  userId_topicId: {
                    userId: currentUserId,
                    topicId: topicToFollowId,
                  },
                },
              });
              const count = await prisma.topicFollow.count({
                where: { topicId: topicToFollowId }
              });
              res.json({ followed: false, followersCount: count });
            } else {
              // Follow
              await prisma.topicFollow.create({
                data: {
                  userId: currentUserId,
                  topicId: topicToFollowId,
                },
              });
              const count = await prisma.topicFollow.count({
                where: { topicId: topicToFollowId }
              });
              res.json({ followed: true, followersCount: count });
            }
          }
        } catch (error) {
          console.error("Toggle follow error:", error);
        }
}

export const showMoreRelatedStories=async(req,res)=>{
  const currentUser=res.locals.currentUser;
  const slug=req.params.slug;
  
  //to know category or topic ==> need to check slug name
  const categories=res.locals.categories;  //get categories from local storage
  const isCategory = categories.find(c => c.slug === slug);
  if(isCategory){
    //get category first ,then you can call category.posts to get posts
      let category=await getCategory({where:{slug:slug}});
      return res.render('category/relatedPosts',
          {isCategory,category,currentUser});
  }else{ //is not category so this is topic
      let topic=await getTopic({where:{slug:slug}});
      return res.render('category/relatedPosts',{isCategory,topic,currentUser,
        getReadTime:res.locals.getReadTime
      });
  }
}