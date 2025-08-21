import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import AllPostsPage from "./pages/AllPostsPage";
import UsersPage from "./pages/UsersPage";
import CategoriesPage from "./pages/CategoriesPage";
import InboxPage from "./pages/InboxPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* The HomePage component is now correctly nested inside a new Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<AllPostsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
