import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiClock,
  HiDocumentText,
  HiInbox,
  HiOutlineStar,
  HiPencilAlt,
  HiTable,
  HiTag,
  HiUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function SidebarComponent() {
  return (
    <div>
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Link to="/">
          <span className="fw-bold mt-20 ml-5 text-3xl">
            MY<span className="logo-color-fill">BLOG</span>
          </span>
        </Link>
        <SidebarItems>
          <SidebarItemGroup>
            {/* Search
            <div className="px-2">
              <div className="relative">
                <HiSearch className="absolute top-3 left-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> */}

            {/* Dashboard */}
            <Link to="/">
              <SidebarItem icon={HiChartPie}>Dashboard</SidebarItem>
            </Link>

            {/* Users */}
            <Link to="/users">
              <SidebarItem icon={HiUsers}>Users</SidebarItem>
            </Link>

            {/* Posts */}
            <SidebarCollapse icon={HiDocumentText} label="Posts">
              <Link to="/posts">
                <SidebarItem icon={HiOutlineStar}>All Posts</SidebarItem>
              </Link>
              <Link to="/posts/featured">
                <SidebarItem icon={HiOutlineStar}>Featured Posts</SidebarItem>
              </Link>
            </SidebarCollapse>

            {/* Categories */}
            <SidebarCollapse icon={HiTag} label="Categories">
              <Link to="/categories">
                <SidebarItem icon={HiOutlineStar}>All Categories</SidebarItem>
              </Link>
              <Link to="/topics">
                <SidebarItem icon={HiOutlineStar}>All Topics</SidebarItem>
              </Link>
            </SidebarCollapse>

            {/* Edit */}
            <SidebarCollapse icon={HiPencilAlt} label="Edit">
              <Link to="/settings/website-name">
                <SidebarItem>Website name</SidebarItem>
              </Link>
              <Link to="/settings/banner-photo">
                <SidebarItem>Banner photo</SidebarItem>
              </Link>
            </SidebarCollapse>

            {/* Inbox */}
            <Link to="/inbox">
              <SidebarItem icon={HiInbox}>Inbox</SidebarItem>
            </Link>

            <Link to="/activities">
              <SidebarItem icon={HiClock}>Activity log</SidebarItem>
            </Link>

            <Link to="/signin">
              <SidebarItem icon={HiArrowSmRight}>Sign in</SidebarItem>
            </Link>
            <Link to="/signup">
              <SidebarItem icon={HiTable}>Sign up</SidebarItem>
            </Link>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}
