import { createCategory } from "@/lib/categories/action";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A simple form component for creating a new category with only a name.
 * It manages the state for the category name and handles form submission.
 */
export default function CreateCategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // CRITICAL: Prevent the default browser form submission
    e.preventDefault();
    const trimmedName = categoryName.trim();
    if (!trimmedName) {
      console.error("Category name cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    // Prepare the category object to pass to the API function
    const newCategory = {
      name: categoryName,
    };

    try {
      // Call your API function and pass the data to it
      const res = await createCategory(newCategory); //return res to handle error

      const data = await res.json();
      //for 409 error(category name already exists error)
      if (!res.ok) {
        setError(data.error);
      } else {
        console.log("category created:", data);
        navigate("/categories");
      }
    } catch (err) {
      console.error("Failed to create category:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h4 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create New Category
        </h4>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-lg border border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
            <label
              htmlFor="category-name"
              className="absolute left-4 -top-4 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-0.5 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Category Name
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              "Create Category"
            )}
          </button>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
