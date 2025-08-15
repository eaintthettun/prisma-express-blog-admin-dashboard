import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "../../types/type";
// import { Avatar } from "flowbite-react";
import default_avatar_png from "/images/default-avatar.png";
import default_post_png from "/images/default-post.png";
import {
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Card } from "flowbite-react";

export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/posts/${id}`);
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [id]);

  return (
    <div className="overflow-x-auto">
      <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="#" icon={HiHome}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="/posts">All posts</BreadcrumbItem>
        <BreadcrumbItem>Post details</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex justify-center mt-10 font-sans text-slate-900">
        <h1 className="text-2xl font-bold mb-10">Post details</h1>
      </div>
      <div className="bg-green-100 flex gap-3"></div>
      <Card className="max-w-6xl mx-auto my-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Image & Metadata */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <img
              src={post?.imageUrl ? post.imageUrl : default_post_png}
              alt={post?.title || "Default Post"}
              className="w-full h-64 object-cover rounded-lg"
            />
            {/* Author Info */}
            <div className="flex items-center gap-2">
              <Avatar
                img={post?.author?.profilePictureUrl || default_avatar_png}
                rounded
              />
              <div>
                <p className="font-semibold">{post?.author?.name}</p>
                <p className="text-sm text-gray-500">
                  Followers: {post?.author?.followers.length}
                </p>
              </div>
            </div>

            {/* Post Badges */}
            <div className="flex flex-col flex-wrap gap-2">
              Is featured?:
              <span
                className={`px-2 rounded italic ${
                  post?.featured
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {post?.featured ? "Yes" : "No"}
              </span>
              <Badge color="info" size="sm">
                Read time: {post?.readTime} min
              </Badge>
              <Badge color="gray" size="sm">
                Views: {post?.viewCount}
              </Badge>
              <Badge color="dark" size="sm">
                Created:{" "}
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
              </Badge>
              <Badge color="purple">{post?.category?.name}</Badge>
              <Badge color="pink">{post?.topic?.name}</Badge>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge color="failure">Likes: {post?.likes.length}</Badge>
              <Badge color="info">Comments: {post?.comments.length}</Badge>
              <Badge color="success">Bookmarks: {post?.bookmarks.length}</Badge>
            </div>
          </div>

          {/* Right Column: Content & Actions */}
          <div className="md:w-2/3 flex flex-col gap-4">
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-4xl font-bold">{post?.title}</h1>
              {post?.subtitle && (
                <h2 className="text-xl italic text-gray-600">
                  {post.subtitle}
                </h2>
              )}
            </div>

            {/* Content */}
            <div className="text-gray-700 whitespace-pre-wrap">
              {post?.content}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button color="gray" size="sm">
                Set as featured post
              </Button>
              <Button color="failure" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
