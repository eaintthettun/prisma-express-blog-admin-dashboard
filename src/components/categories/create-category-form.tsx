import { createCategory } from "@/lib/categories/action";
import React, { useState } from "react";

/**
 * A simple form component for creating a new category with only a name.
 * It manages the state for the category name and handles form submission.
 */
export default function CreateCategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmedName = categoryName.trim();
    if (!trimmedName) {
      console.error("Category name cannot be empty.");
      return;
    }

    // Prepare the category object to pass to the API function
    const newCategory = {
      name: categoryName,
    };

    console.log("Form data to send to api:", newCategory);

    try {
      // Call your API function and pass the data to it
      const createdCategory = await createCategory(newCategory);
      console.log("Category created:", createdCategory);

      // Reset the form after success
      setCategoryName("");
    } catch (err) {
      console.error("Failed to create category:", err);
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Category"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
