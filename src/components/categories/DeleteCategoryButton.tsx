import { useAdminContext } from "@/context/AdminContext";
import { deleteCategory } from "@/lib/categories/action";
import { useNavigate } from "react-router-dom";

//Add a prop that controls the button style
type Props = {
  id: string | undefined;
  variant?: "default" | "danger"; // default (all categories), danger (details page)
};

export default function DeleteCategoryButton({
  id,
  variant = "default",
}: Props) {
  const navigate = useNavigate();
  const { token } = useAdminContext();

  const baseClasses = "font-semibold transition";
  const variantClasses =
    variant === "danger"
      ? "bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded"
      : "text-red-700";

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmed) return;

    try {
      const res = await deleteCategory(id, token);

      if (res.ok) {
        alert("Category deleted successfully!");
        if (variant === "default") navigate(0);
        else navigate("/categories");
      } else {
        const error = await res.text();
        alert("Failed to delete category: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Could not delete category.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`${baseClasses} ${variantClasses}`}
    >
      Delete
    </button>
  );
}
