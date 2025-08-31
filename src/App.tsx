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
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/posts" element={<AllPostsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/add" element={<CreateCategoryForm />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admins" element={<AdminsPage />} />
      </Route>
    </Routes>
  );
}
