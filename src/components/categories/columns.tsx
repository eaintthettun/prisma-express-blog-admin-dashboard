import type { Category } from "@/types/type";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
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
    header: "Posts",
    cell: ({ row }) => {
      // Access the posts array from the row data
      const posts = row.original.posts;

      // Return the length of the posts array
      return <div>{posts ? posts.length : 0}</div>;
    },
  },
  {
    accessorKey: "topics",
    header: "Topics",
    cell: ({ row }) => {
      // Access the posts array from the row data
      const topics = row.original.topics;

      // Return the length of the posts array
      return <div>{topics ? topics.length : 0}</div>;
    },
  },
  {
    accessorKey: "followers",
    header: "Followers",
    cell: ({ row }) => {
      // Access the posts array from the row data
      const followers = row.original.followedBy;

      // Return the length of the posts array
      return <div>{followers ? followers.length : 0}</div>;
    },
  },
];
