import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
import getPostsQuery from '../utils/getPosts.js';

//to write 1000 views as 1k
function formatViewCount(count) {
    if (count < 1000) return count.toString();
    if (count < 1_000_000) {
      return (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + 'k';
    }
    return (count / 1_000_000).toFixed(count % 1_000_000 === 0 ? 0 : 1) + 'M';
}  



export const getFollowingFeed=async(req,res)=>{
    const userId = req.session.userId;
    const page = parseInt(req.query.page) || 1;
    let ITEMS_PER_PAGE=5;
    const skip = (page - 1) * ITEMS_PER_PAGE;
        
    // Step 1: Get followed user IDs
    const followedUsers = await prisma.userFollow.findMany({
        where: { followerId: userId },
        select: { followingId: true }
    });
    const followedUserIds = followedUsers.map(followedUser => followedUser.followingId);

    // Step 2: Get followed topic IDs
    const followedTopics = await prisma.topicFollow.findMany({
        where: { userId },
        include:{
            topic:{
                select:{
                    name:true,
                    slug:true,
                }
            }
        }
    });
    const followedTopicIds = followedTopics.map(followedTopic => followedTopic.topicId);

    // Step 3: Get followed category IDs
    const followedCategories = await prisma.categoryFollow.findMany({
        where: { userId },
        include:{
            category:{
                select:{
                    name:true,
                    slug:true,
                }
            }
        }
    });
    const followedCategoryIds = followedCategories.map(followedCategory => followedCategory.categoryId);


    // Step 4: Fetch posts that match any of those
    //followed authors or followed categories or followed topics
    //getPostsQuery method takes skip,Items_per_page and where{} as params and returns post array
    const posts = await getPostsQuery({
        skip,
        ITEMS_PER_PAGE,
        where: {
        OR: [
            { authorId: { in: followedUserIds } },
            { topicId: { in: followedTopicIds } },
            { categoryId: { in: followedCategoryIds } }
        ]
        },
    });
 
    const totalItems=await prisma.post.count({
        where: {
            OR: [
                { authorId: { in: followedUserIds } },
                { topicId: { in: followedTopicIds } },
                { categoryId: { in: followedCategoryIds } }
            ]
        },
    });
    
    const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE);

    const isFollowingFeed=true;
    res.render('posts/followingFeed', {
        posts,
        currentPage:page,
        totalPages,
        hasNextPage:page<totalPages,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        getReadTime: res.locals.getReadTime,
        currentUser: res.locals.currentUser,
        followedTopics, //for scroll bar
        followedCategories, //for scroll bar
        feedTitle:"Your following feed",
        feedDescription:"Read articles from authors and topics that you follow...",
        activeTab: "following", // ✅ This activates the button
        isFollowingFeed
    });
}


export const bookMarkPost=async(req,res)=>{
    const postId = parseInt(req.params.id);
    const currentUserId = req.session.userId; // Ensure currentUserId is correctly set in your session
    const redirectTo = req.header('Referer') || `/posts`; // Fallback to the all posts page

    try {
        const existingBookmark = await prisma.bookMark.findUnique({
            where: {
                userId_postId: {
                    userId: currentUserId,
                    postId: postId,
                },
            },
        });

        if (existingBookmark) {
            // If exists, delete (unbookmark)
            await prisma.bookMark.delete({
                where: {
                    userId_postId: {
                        userId: currentUserId,
                        postId: postId,
                    },
                },
            });
            res.redirect(redirectTo);
        } else {
            // If not exists, create (bookmark)
            await prisma.bookMark.create({
                data: {
                    userId: currentUserId,
                    postId: postId,
                },
            });
            res.redirect(redirectTo);
        }
    } catch (error) {
        console.error('Error toggling bookmark:', error);
    }
}

export const showPostDetails=async(req,res)=>{
    const postId=parseInt(req.params.id);
    
    const post=await prisma.post.findUnique({
        where:{id:postId},
        include:{
            _count:{
                select:{
                    likes:true,
                    comments:true
                }
            },
            category:true,
            bookmarks:true,
            likes:true,
            comments:true,
            author:{
                include:{followers:true}
            },
            comments: {
                where:{parentId:null},
                orderBy: {createdAt: 'desc'},
                include: {
                  children:{ //children= child comment(reply)
                    include:{
                        author:true,
                        commentLikes:true,
                    }
                  },
                  commentLikes:true,
                  author: true,
                },
            },
        },
    });
    
    res.json({post});
}

// Like/Unlike routes
export const likePost=async(req,res)=>{
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: parseInt(req.params.id),
        authorId: req.session.userId,
      },
    });

    //if like exists, the code assumes that user unlike the post
    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return res.json({ liked: false });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          postId: parseInt(req.params.id),
          authorId: req.session.userId,
        },
      });
      return res.json({ liked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing like' });
  }
}


//getPostsQuery(...)=used for searchPosts,listAllPosts,listMyPosts
export const searchPosts=async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    let ITEMS_PER_PAGE=5;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const searchWord=req.query.search;
    let posts=[];
    if (searchWord.trim() !== "") {
        //getPostsQuery method takes skip,take and where{} as params and returns post array
        posts=await getPostsQuery({ skip, take:ITEMS_PER_PAGE,  
            where: {
                         title:
                          { contains: searchWord, mode: 'insensitive' } 
                    },
            }
        );
    }
    const totalItems=await prisma.post.count({
        where:{
                title:
                    { contains: searchWord, mode: 'insensitive' }  
        }
    });
    const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE);

    res.render('posts/searchPosts', { 
        posts,
        currentPage:page,
        totalPages,
        hasNextPage:page<totalPages,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        getReadTime:res.locals.getReadTime,
    });
}

// GET /posts?page=1&limit=10
// Add pagination parameters
export const listAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // current page
  const limit = parseInt(req.query.limit) || 10; // items per page
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      author: true,
      category: true,
    },
  });

  const total = await prisma.post.count(); // total number of posts

  res.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
};

//sql query (select * from posts where authorId=req.session.userId)
export const listMyPosts=async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    let ITEMS_PER_PAGE=5;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    //getPostsQuery method takes skip,take and where{} as params and returns post array
    const posts = await getPostsQuery({ skip, ITEMS_PER_PAGE,
        where:{
            authorId:req.session.userId
        }
     });

     const totalItems=await prisma.post.count({
        where:{
            authorId:req.session.userId
        }
    });
    const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE);

    res.render('posts/myPosts', { 
        posts,
        currentPage:page,
        totalPages,
        hasNextPage:page<totalPages,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        currentUser:res.locals.currentUser,
        getReadTime:res.locals.getReadTime });   
};

export const showCreateForm=async(req,res)=>{
    const categories=await prisma.category.findMany();
    res.render('posts/create',{categories});
}

export const createPost=async (req,res)=>{
    const {title,subtitle,imageUrl,content,categoryId}=req.body;
    await prisma.post.create({
        data:{
            title,
            subtitle,
            imageUrl,
            content,
            authorId:req.session.userId,
            categoryId:parseInt(categoryId)
        }
    });
    res.redirect('/posts');
}

export const showEditForm=async(req,res)=>{
    const post=await prisma.post.findUnique({
        where:{id:parseInt(req.params.id)}
    });
    const categories=await prisma.category.findMany({
    });
    //check post owner
    if(post.authorId !== req.session.userId ){
        return res.status(403).json({message:"This is not your post"});
    }
    
    res.render('posts/edit',{post,categories});
}

export const updatePost=async(req,res)=>{
    const {title,content}=req.body;
    await prisma.post.update({
        where:{id:parseInt(req.params.id)}, //condition
        data:{title,content} //form data
    });
    res.redirect('/posts');
}

export const deletePost=async(req,res)=>{
    
    await prisma.post.delete({
        where:{id:parseInt(req.params.id)}
    });
    return res.status(200).json({ message: 'Post deleted successfully' });
}

