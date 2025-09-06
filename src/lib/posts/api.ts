export async function getPosts(token:string | null) {
        try
        {
            const res=await fetch("http://localhost:5000/posts",{
                headers: { Authorization: `Bearer ${token}` }
            }
            );

            if(!res.ok){
                throw new Error(`Failed to fetch posts: ${res.status}`);
            }

            const data=await res.json();
            return data;

        }catch(error){
            console.error('Error fetching posts:',error);
            return [];
        }
}