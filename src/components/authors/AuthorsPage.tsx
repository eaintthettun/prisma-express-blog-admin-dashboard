import { useState, useEffect } from "react";
import type { Author } from "@/types/type";
import { columns } from "@/components/authors/columns";
import { DataTable } from "../data-table";
import { getAuthors } from "@/lib/authors/api";
import { useAdminContext } from "@/context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, logout } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await getAuthors(token);

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
        setAuthors(data);
      } catch (err) {
        console.error("Failed to fetch authors:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [token, logout, navigate]);

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
    <div className="container mx-auto">
      <div>
        <p className="text-muted-foreground text-center text-xl text-gray-700">
          Manage authors and their settings.
        </p>
      </div>
      <DataTable columns={columns} data={authors} dataType="authors" />
    </div>
  );
}
