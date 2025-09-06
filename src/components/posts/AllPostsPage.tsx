import { useState, useEffect } from "react";
import type { Post } from "@/types/type";
import { columns } from "@/components/posts/columns";
import { DataTable } from "@/components/data-table";
import { getPosts } from "@/lib/posts/api";
import { useAdminContext } from "@/context/AdminContext";

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAdminContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(token);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [token]);
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
