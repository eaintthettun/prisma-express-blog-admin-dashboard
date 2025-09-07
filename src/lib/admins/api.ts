//all admins
export async function getAdmins(token:string | null):Promise<Response> { 
        try
        {
            const res=await fetch("http://localhost:5000/admins",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res;
        }catch(error){
            // Network error → backend is likely down
            console.error("Cannot connect to the server. Please try again later.",error);
            throw new Error("Cannot connect to the server. Please try again later.");
        }
}

export async function getAdminById(id:string) {
    try{
        const res=await fetch("http://localhost:5000/admins/"+id);

        if(!res.ok){
            throw new Error('Failed to fetch admin')
        }
        const data=await res.json();
        return data;
    }catch(error){
        console.error('Error fetching admin:',error);
        return null;
    }
}


