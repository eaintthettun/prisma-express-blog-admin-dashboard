import { Category } from "@/types/type";

//carry category object to create a category
// no need id becaus id is auto-incremented in database
export async function createCategory(category:Omit<Category,'id'>,token:string | null):Promise<Response> {
    try{
        const res=await fetch("http://localhost:5000/categories",{
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify(category) //carry category in body
        });
        return res;
    }catch(error){
       console.error("Cannot connect to the server. Please try again later.",error);
       throw new Error("Cannot connect to the server. Please try again later.");
    }
}

export async function deleteCategory(id:string | undefined,token:string | null):Promise<Response> {
    try{
        const res=await fetch(`http://localhost:5000/categories/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    }catch(error){
       console.error("Cannot connect to the server. Please try again later.",error);
       throw new Error("Cannot connect to the server. Please try again later.");
    }
}
