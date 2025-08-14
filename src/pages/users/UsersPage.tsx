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
import type { Author } from "../../types/type";

export default function UsersPage() {
  const [posts, setPosts] = useState<Author[]>([]);
  //const [page, setPage] = useState(1);
  //const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/users?page=${page}&limit=10`
        );
        const data = await res.json(); //data:{ users }
        setPosts(data.users);
        //setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center mt-10 font-sans text-slate-900">
        <h1 className="text-2xl font-bold mb-10">All Users</h1>
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
                  {post.title}
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
                  {post.featured}
                </TableCell>
                <TableCell className="flex justify-center gap-3">
                  <Link
                    to="/staff/view/:id"
                    className="px-4 py-2 text-amber-600 font-semibold"
                  >
                    View
                  </Link>
                  <Link
                    to="/staff/edit/:id"
                    className="px-4 py-2 text-amber-600 font-semibold"
                  >
                    Edit
                  </Link>
                  <Link
                    to="/staff/delete/:id"
                    className="px-4 py-2 text-amber-600 font-semibold"
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
      <div className="pagination mt-4 flex justify-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <div className="flex justify-center mt-4">
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
