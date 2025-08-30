import type { Author } from "@/types/type";
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

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "id",
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="text-cyan-50"
      />
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="City"
        className="text-cyan-50"
      />
    ),
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Country"
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
    accessorKey: "posts",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total posts"
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
    accessorKey: "followers",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Followers"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      // Access the posts array from the row data
      const followers = row.original.followers;

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
      const authorId = row.original.id;
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
              <Link to={"/author/" + authorId}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/author/delete/" + authorId}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
