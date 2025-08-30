//all categories
export async function getCategories() { 
        try
        {
            const res=await fetch("http://localhost:5000/categories");

            if(!res.ok){
                throw new Error(`Failed to fetch categories: ${res.status}`);
            }

            const data=await res.json();
            return data;

        }catch(error){
            console.error('Error fetching categories:',error);
            return [];
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