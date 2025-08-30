import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();

export const createCategory=async(req,res)=>{
  const {name}=req.body;

}

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
        }
    });
    res.json(categories);
}