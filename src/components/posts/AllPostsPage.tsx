import { useState, useEffect } from "react";
import type { Post } from "@/types/type";
import { columns } from "@/components/posts/columns";
import { DataTable } from "@/components/data-table";

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);
  {
    console.log("fetched post array:", posts);
  }
  return (
    <div className="container mx-auto">
      <div>
        <p className="text-muted-foreground text-center text-xl text-gray-700">
          Manage posts and their settings.
        </p>
      </div>
      <DataTable columns={columns} data={posts} dataType="post" />
    </div>
  );
}
