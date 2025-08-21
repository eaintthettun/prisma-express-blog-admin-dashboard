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

  {
    console.log("categories are:", categories);
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
