import type { Post } from "@/types/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="text-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Title"
        className="text-cyan-50"
      />
    ),
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Author"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      return <div>{row.original.author.name}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      return <div>{row.original.category.name}</div>;
    },
  },
  {
    accessorKey: "readTime",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Read time"
        className="text-cyan-50"
      />
    ),
  },
  {
    accessorKey: "featured",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Featured"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      const featured = row.original.featured;
      return <div>{featured ? "yes" : "no"}</div>;
    },
  },
  {
    accessorKey: "viewCount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="View count"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      const views = row.original.viewCount;
      return <div>{views ? views : 0}</div>;
    },
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
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Post likes"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      const likes = row.original.likes;
      return <div>{likes ? likes.length : 0}</div>;
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Comments"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      const comments = row.original.comments;
      return <div>{comments ? comments.length : 0}</div>;
    },
  },
  {
    accessorKey: "bookmarks",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Bookmarks"
        className="text-cyan-50"
      />
    ),
    cell: ({ row }) => {
      const bookmarks = row.original.bookmarks;
      return <div>{bookmarks ? bookmarks.length : 0}</div>;
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
      const postId = row.original.id;
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
              <Link to={"/post/" + postId}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/post/delete/" + postId}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
