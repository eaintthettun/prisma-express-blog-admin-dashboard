//all admins
export async function getAdmins() { 
        try
        {
            const res=await fetch("http://localhost:5000/admins");

            if(!res.ok){
                throw new Error(`Failed to fetch admins: ${res.status}`);
            }

            const data=await res.json();
            return data;

        }catch(error){
            console.error('Error fetching admins:',error);
            return [];
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