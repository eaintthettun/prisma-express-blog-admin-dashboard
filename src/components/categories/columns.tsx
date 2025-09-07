import type { Category } from "@/types/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DataTableColumnHeader } from "../data-table-column-header";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteCategoryButton from "./DeleteCategoryButton";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id", //must match with type category id
    // header: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
        className="text-cyan-50"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="text-cyan-50"
      />
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Slug"
        className="text-cyan-50"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created at"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      const dateString = row.original.createdAt; // Access the date string from the row data

      if (!dateString) {
        return <span>N/A</span>; // Handle cases where the date is missing
      }

      try {
        const date = new Date(dateString);
        // Use toLocaleString() for a readable date and time,
        // or customize with options for specific formatting.
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return <div>{formattedDate}</div>;
      } catch (error) {
        console.error("Invalid date format:", error, " ", dateString);
        return <span>Invalid Date</span>;
      }
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Updated at"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      const dateString = row.original.updatedAt; // Access the date string from the row data

      if (!dateString) {
        return <span>N/A</span>; // Handle cases where the date is missing
      }

      try {
        const date = new Date(dateString);
        // Use toLocaleString() for a readable date and time,
        // or customize with options for specific formatting.
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return <div>{formattedDate}</div>;
      } catch (error) {
        console.error("Invalid date format:", error, " ", dateString);
        return <span>Invalid Date</span>;
      }
    },
  },
  {
    accessorKey: "posts",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Posts"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      // Access the posts array from the row data
      const posts = row.original.posts;

      // Return the length of the posts array
      return <div>{posts ? posts.length : 0}</div>;
    },
  },
  {
    accessorKey: "topics",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Topics"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      // Access the posts array from the row data
      const topics = row.original.topics;

      // Return the length of the posts array
      return <div>{topics ? topics.length : 0}</div>;
    },
  },
  {
    accessorKey: "followedBy",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Followed by"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      // Access the posts array from the row data
      const followers = row.original.followedBy;

      // Return the length of the posts array
      return <div>{followers ? followers.length : 0}</div>;
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white shadow-2xl p-3 flex flex-col gap-2 rounded-2xl z-10
            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=open]:zoom-in-95
            data-[state=open]:slide-in-from-top-2
            
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:zoom-out-95
            data-[state=closed]:slide-out-to-top-2
            "
          >
            <DropdownMenuItem>
              <Link to={"/categories/" + row.original.id}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/categories/edit/" + row.original.id}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteCategoryButton id={row.original.id.toString()} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
