//all categories
export async function getCategories(token:string | null):Promise<Response> { 
        try {
            const res = await fetch("http://localhost:5000/categories", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res;
        } catch (err) {
            // Network error → backend is likely down
            console.error("Cannot connect to the server. Please try again later.",err);
            throw new Error("Cannot connect to the server. Please try again later.");
        }
}

export async function getCategoryById(id:string | undefined,token:string | null):Promise<Response> {
    try{
        const res=await fetch("http://localhost:5000/categories/"+id,{
            method:"POST",
            headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return res;
    }catch(error){
       console.error("Cannot connect to the server. Please try again later.",error);
       throw new Error("Cannot connect to the server. Please try again later.");
    }
}