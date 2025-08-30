import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./components/HomePage";
import AllPostsPage from "./components/posts/AllPostsPage";
import CategoriesPage from "./components/categories/CategoriesPage";
import InboxPage from "./components/InboxPage";
import SettingsPage from "./components/SettingsPage";
import AuthorsPage from "./components/authors/AuthorsPage";
import AdminsPage from "./components/admins/AdminsPage";
import CreateCategoryForm from "./components/categories/create-category-form";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* The HomePage component is now correctly nested inside a new Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/posts" element={<AllPostsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admins" element={<AdminsPage />} />

        <Route path="/categories/add" element={<CreateCategoryForm />} />
      </Route>
    </Routes>
  );
}
