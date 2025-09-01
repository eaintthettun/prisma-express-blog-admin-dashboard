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
    res.json(createdCategory);

  } catch (error) {
    console.error('Failed to create category:', error);
    res.status(500).json({ error: 'Failed to create category due to an unexpected error.' });
  }
};

export const listCategories=async(req,res)=>{
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
}