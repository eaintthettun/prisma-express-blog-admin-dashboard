import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
import slugify from 'slugify';

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const options = {
    lower: true,
    strict: true
  };

  try {
    // 1. First, check if a category with this name already exists.
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive' // Optional: Makes the check case-insensitive
        }
      }
    });

    // 2. If it exists, send a 409 Conflict error and a message.
    if (existingCategory) {
      console.error('Error: Category with this name already exists.');
      return res.status(409).json({ error: `Category with name '${name}' already exists.` });
    }

    // 3. If it does NOT exist, create the new category.
    const createdCategory = await prisma.category.create({
      data: {
        name,
        slug: slugify(name, options)
      }
    });
    return res.json(createdCategory);

  } catch (error) {
    console.error('Failed to create category:', error);
    return res.status(500).json({ error: 'Failed to create category due to an unexpected error.' });
  }
};

export const listCategories=async(req,res)=>{
    try{
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
        },
        orderBy:{
            createdAt:'desc'
        }
        });
        res.json(categories);
    }catch(error){
      console.error('Failed to get categories:', error);
      res.status(500).json({ error: 'Failed to get categories due to an unexpected error.' });
    }
}

export const deleteCategory=async (req,res)=>{
  const categoryId=parseInt(req.params.id);
  try{    
    await prisma.category.delete({
      where:{id:categoryId}
    });

    return res.json({id:categoryId});
  }catch(error){
    console.error('Failed to delete category:', error);
    return res.status(500).json({ error: 'Failed to delete category due to an unexpected error.' });
  }
}

export const viewCategory=async(req,res)=>{
  const categoryId=parseInt(req.params.id);
   try{
     const category=await prisma.category.findUnique({
      where:{id:categoryId},
      include:{
        posts:{
          orderBy:{
            viewCount:'desc'
          },
          select:{
            title:true,
            author:true,
            createdAt:true,
            viewCount:true,
            likes:true,
            comments:true,
          }
        },
        topics:{
          select:{
            name:true,
            posts:true,
            followedBy:true
          }
        },
        followedBy:true
      }
     });
     res.json(category);
   }catch(error){
    console.error('Failed to get category:', error);
    return res.status(500).json({ error: 'Failed to get category due to an unexpected error.' });
  }
}