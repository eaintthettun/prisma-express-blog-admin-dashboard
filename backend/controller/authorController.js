import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const listAuthors=async(req,res)=>{
    try{
        const authors=await prisma.user.findMany({
            include:{
                posts:true,
                followers:true,
            }
        });
        return res.json(authors);
    }catch(error){
        console.error('Failed to get authors:', error);
        return res.status(500).json({ error: 'Failed to get authors due to an unexpected error.' });
    }
}