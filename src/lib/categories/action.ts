import { Category } from "@/types/type";

//carry category object to create a category
// no need id becaus id is auto-incremented in database
export async function createCategory(category:Omit<Category,'id'>) {
    const res=await fetch("http://localhost:5000/categories",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(category) //carry category in body
    });
    return res;
}