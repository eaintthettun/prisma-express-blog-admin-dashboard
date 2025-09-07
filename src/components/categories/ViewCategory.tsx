import React, { useEffect, useState } from "react";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Category, Post, Topic } from "@/types/type";
import { useAdminContext } from "@/context/AdminContext";
import { getCategoryById } from "@/lib/categories/api";
import {
  Eye,
  MessageCircle,
  NotepadText,
  Plus,
  ThumbsUp,
  User,
} from "lucide-react";

export default function ViewCategory() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category>();
  const [topics, setTopics] = useState<Topic[]>();
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, logout } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function inside the useEffect hook
    const fetchCategory = async () => {
      try {
        const res = await getCategoryById(id, token);

        if (!res.ok) {
          if (res.status === 403) {
            // handle expired token
            logout();
            navigate("/");
            return;
          }

          // other HTTP errors
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const topics = data.topics;
        setTopics(topics);
        setCategory(data);
        setPosts(data.posts);
      } catch (err) {
        console.error("Failed to fetch category:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, token, logout, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading data, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-red-600">
            An Error Occurred!
          </h2>
          <p className="mt-2 text-center text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Category Details
            </h1>
            <p className="text-md text-muted-foreground text-gray-700 mt-1">
              Manage and view category information
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={"/categories/edit/" + category?.id}
              className="text-md font-semibold bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded"
            >
              Edit Category
            </Link>
            <DeleteCategoryButton id={id} variant="danger" />
          </div>
        </div>

        {/* First Row - Category Info and Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Information */}
          <Card className="bg-white border-0 shadow-gray-400 shadow-md">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                Category Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ID
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-gray-700">
                    {category?.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-gray-700">
                    {category?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Slug
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-gray-700">
                    {category?.slug}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground ">
                    Posts
                  </p>
                  <p className="text-sm text-muted-foreground mt-1  text-gray-700">
                    {category?.posts?.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Topics
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-gray-700">
                    {category?.topics?.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground ">
                    Followers
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-gray-700">
                    {category?.followedBy?.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Created
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-gray-700">
                    {category?.createdAt
                      ? new Date(category.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Updated
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-gray-700">
                    {category?.updatedAt
                      ? new Date(category.updatedAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Topics */}
          <Card className="bg-white border-0 shadow-gray-400 shadow-md">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-card-foreground flex items-center">
                  Topics in this Category
                </CardTitle>
                <div className="flex gap-0.5 border-2 border-black px-2 py-1 rounded">
                  <Plus width={15} />
                  <button className="text-sm font-semibold text-black rounded">
                    Add Topic
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {!topics || topics.length === 0 ? (
                  <p>No topics yet..</p>
                ) : (
                  topics?.map((topic) => (
                    <Card
                      key={topic.id}
                      className="bg-gray-50 border-0 hover:bg-blue-100
                       transition-colors cursor-pointer py-3 shadow-md"
                    >
                      <CardContent>
                        <div>
                          <h3 className="font-medium text-secondary-foreground text-balance">
                            {topic.name}
                          </h3>
                        </div>
                        <div className="flex flex-col text-gray-700">
                          <div className="flex gap-0.5 mt-3 mb-3">
                            <NotepadText width={20} />
                            <p className="text-sm text-muted-foreground mt-1">
                              {topic.posts.length} posts
                            </p>
                          </div>
                          <div className="flex gap-0.5">
                            <User width={20} />
                            <p className="text-sm text-muted-foreground mt-1">
                              {topic.followedBy.length} followers
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row - Most Read Posts */}
        <Card className="bg-white border-0 shadow-gray-400 shadow-md">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              Most Read Posts in "{category?.name}"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!posts || posts.length === 0 ? (
                <p>No posts found..</p>
              ) : (
                posts?.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-100 transition-colors shadow-sm shadow-gray-400"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-secondary-foreground text-balance">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        by {post.author.name} •{" "}
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.viewCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {post.likes.length}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments.length}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
