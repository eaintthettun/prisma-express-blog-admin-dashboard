import { useState, useEffect } from "react";
import type { Author } from "@/types/type";
import { columns } from "@/components/authors/columns";
import { DataTable } from "../data-table";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:5000/authors");
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
      }
    };

    fetchAuthors();
  }, []);

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
