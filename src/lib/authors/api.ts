export async function getAuthors(token:string | null):Promise<Response> { 
        try {
            const res = await fetch("http://localhost:5000/authors", {
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