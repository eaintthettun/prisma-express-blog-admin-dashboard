import { Category } from "@/types/type";

//carry category object to create a category
export async function createCategory(category:Omit<Category,'id'>) {
    const res=await fetch("http://localhost:5000/categories",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(category) //carry category in body
    });
    const data=await res.json();
    return data;
}