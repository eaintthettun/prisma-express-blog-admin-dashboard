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

export async function getCategoryById(id:string) {
    try{
        const res=await fetch("http://localhost:5000/categories/"+id);

        if(!res.ok){
            throw new Error('Failed to fetch category')
        }
        const data=await res.json();
        return data;
    }catch(error){
        console.error('Error fetching category:',error);
        return null;
    }
}