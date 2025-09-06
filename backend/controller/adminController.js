import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();

export const listAdmins=async(req,res)=>{
    try{
        const admins=await prisma.admin.findMany({
            orderBy:{
                createdAt:'desc'
            }
        });
        res.json(admins);
    }catch(error){
        console.error('Failed to fetch admins:',error);
    }
}

export const createAdmin=async(req,res)=>{
    const {name,email,password,phoneNo,role,status}=req.body;

    try{
        const admin=await prisma.admin.create({
        data:{
            name,email,password,phoneNo,role,status
        }
        })

        res.json(admin);
    }catch(error){
        console.error('Failed to delete admin:',error);
    }
}

export const updateAdmin=async(req,res)=>{
    const adminId=req.params.id;
    const {name,email,password,phoneNo,role,status}=req.body;

    try{
        const admin=await prisma.admin.update({
        where:{id:parseInt(adminId)}, //condition
        data:{
            name,email,password,phoneNo,role,status
        }
        })

        res.json(admin);
    }catch(error){
        console.error('Failed to update admin:',error);
    }
}

export const deleteAdmin=async(req,res)=>{
    const adminId=req.params.id;
    const {name,email,password,phoneNo,role,status}=req.body;

    try{
        const admin=await prisma.admin.delete({
        where:{id:parseInt(adminId)}, //condition
        })

        res.json(admin);
    }catch(error){
        console.error('Failed to delete admin:',error);
    }
}