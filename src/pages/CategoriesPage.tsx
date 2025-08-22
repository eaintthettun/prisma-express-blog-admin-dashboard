import { DataTable } from "@/components/categories/data-table";
import { useState, useEffect } from "react";
import type { Category } from "@/types/type";
import { columns } from "@/components/categories/columns";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/topics");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto">
      <div>
        <p className="text-muted-foreground text-center text-xl text-gray-700">
          Manage your product categories and their settings.
        </p>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
