import { Admin } from "@/types/type";

//carry admin object to create an admin
export async function createAdmin(admin:Omit<Admin,'id'>) {
    const res=await fetch("http://localhost:5000/admins",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(admin) //carry admin in body
    });
    const data=await res.json();
    return data;
}

export async function updateCategory(id:string,admin:Omit<Admin,`id`>) {
    const res=await fetch(`http://localhost:5000/admins/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(admin) //carry admin in body
    });
    
    if(res.ok){
        const data=await res.json();
        return data;
    }else{
        const errorData=await res.json().catch(()=>({message:'Failed to update admin'}));
        return {success:false,error: errorData.message || 'An error occurred while updating category'}
    }
}

export async function deleteAdmin(id:string) {
    const res=await fetch(`http://localhost:5000/${id}`,{
        method:"DELETE",
    });
    if(res.ok){
        return {success:true,message:'Admin deleted successfully'};
    }else{
        const errorData=await res.json().catch(()=>({message:'Failed to delete admin'}));
        return {success:false,error: errorData.message || 'An error occurred while deleting admin'}
    }
}

export async function loginAdmin(admin:Omit<Admin,'id'>) {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  });

  return res;
}