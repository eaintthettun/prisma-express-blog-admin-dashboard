import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import StaffPage from "./pages/posts/AllPostsPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/users/UsersPage";
import AllPostsPage from "./pages/posts/AllPostsPage";
import FeaturedPostsPage from "./pages/posts/FeaturedPostsPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import TopicsPage from "./pages/categories/TopicsPage";

export default function App() {
  return (
    <Routes>
      {/* Auth pages */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      {/* Dashboard pages */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<AllPostsPage />} />
        <Route path="/posts/featured" element={<FeaturedPostsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Add more dashboard pages here */}
      </Route>
    </Routes>
  );
}
