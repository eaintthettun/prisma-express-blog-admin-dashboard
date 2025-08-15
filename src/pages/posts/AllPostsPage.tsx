import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";
import type { Post } from "../../types/type";
import { Pagination } from "flowbite-react";

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/posts?page=${page}&limit=10`
        );
        const data = await res.json(); //data:{ posts, total, page, totalPages: Math.ceil(total / limit) }
        setPosts(data.posts);
        setTotalPages(data.totalPages); //2
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [page]); //will run again whenever page changes

  const onPageChange = (page: number) => setPage(page);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center mt-10 font-sans text-slate-900">
        <h1 className="text-2xl font-bold mb-10">All Posts</h1>
      </div>

      {posts.length === 0 ? (
        <p>No posts found..</p>
      ) : (
        <Table striped>
          <TableHead>
            <TableHeadCell className="bg-slate-300 text-center">
              ID
            </TableHeadCell>
            <TableHeadCell className="bg-slate-300 text-center">
              Title
            </TableHeadCell>
            <TableHeadCell className="bg-slate-300 text-center">
              Author
            </TableHeadCell>
            <TableHeadCell className="bg-slate-300 text-center">
              Category
            </TableHeadCell>
            <TableHeadCell className="bg-slate-300 text-center">
              Views
            </TableHeadCell>
            <TableHeadCell className="bg-slate-300 text-center">
              Featured
            </TableHeadCell>
            <TableHeadCell className="bg-slate-300 text-center">
              Action
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="text-center text-slate-800">
                  {post.id}
                </TableCell>
                <TableCell className="text-center text-slate-800">
                  <Link to={`/posts/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className="text-center text-slate-800">
                  {post.author.name}
                </TableCell>
                <TableCell className="text-center text-slate-800">
                  {post.category.name}
                </TableCell>
                <TableCell className="text-center text-slate-800">
                  {post.viewCount}
                </TableCell>
                <TableCell className="text-center text-slate-800">
                  {post.featured ? (
                    <span className="text-green-600 italic px-2 py-1">
                      featured
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    to={"/posts/" + post.id}
                    className="px-4 text-slate-600 font-semibold"
                  >
                    View
                  </Link>
                  <Link
                    to={"posts/edit" + post.id}
                    className="px-4 text-amber-600 font-semibold"
                  >
                    Edit
                  </Link>
                  <Link
                    to={"posts/delete" + post.id}
                    className="px-1 bg-red-500 text-white font-semibold py-1 rounded"
                  >
                    Delete
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* Add pagination controls */}
        </Table>
      )}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div className="flex justify-center mt-10">
        <Link
          to="/posts/create"
          className="px-4 py-2 bg-slate-600 text-white rounded"
        >
          Add New Post
        </Link>
      </div>
    </div>
  );
}
