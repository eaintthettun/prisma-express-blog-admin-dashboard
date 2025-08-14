import express from "express";
import dotenv from 'dotenv';
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import PrismaSessionStore from "./utils/PrismaSessionStore.js";
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postsRoutes.js"
import topicRoutes from "./routes/topicRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"

dotenv.config();
const prisma = new PrismaClient();
const app=express();

app.use(cors({
  origin: "http://localhost:5173", // allow only your frontend
  credentials: true // if you want to send cookies/session
}));

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);

//api routes
app.use('/auth',authRoutes);
app.use('/posts',postRoutes); //only write posts when only login
app.use('/comments',commentRoutes);
app.use('/topics',topicRoutes);

app.get('/users',async(req,res)=>{
  const users=await prisma.user.findMany();
  res.json(users);
})
const PORT=process.env.PORT || 5800;
app.listen(PORT,()=>console.log(`Server running on port http://localhost:${PORT}`));

