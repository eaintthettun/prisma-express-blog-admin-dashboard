import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const app = express();
app.use(cors());


app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany(
      {
        where:{
          role:"STAFF" //get all employees where role='STAFF'
        }
      }
    );
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
