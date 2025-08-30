// DataTable.tsx
//this datatable is reuseable for admin table,author,category,...
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "./ui/input";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dataType: string;
}

export function DataTable<TData extends { id: number }, TValue>({
  columns,
  data,
  dataType,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]); //for name sort
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>( //for name search filter
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({}); //for column visibility
  const [rowSelection, setRowSelection] = React.useState({}); //for row selection

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters, //after setColumnFilters
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="p-5">
      <div className="flex items-center py-4 justify-between">
        {dataType === "post" && (
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm  focus:ring-0 focus:ring-gray-300 
          border-gray-300"
          />
        )}

        {(dataType === "category" ||
          dataType === "authors" ||
          dataType === "admin") && (
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm focus:ring-0 focus:ring-gray-300 border-gray-300"
          />
        )}

        <div className="flex gap-2">
          {dataType === "category" && (
            <Link to="/category/add">
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex bg-transparent border-gray-500 focus:ring-0 focus:ring-gray-300 hover:bg-gray-100"
              >
                <IconPlus className="h-4 w-4" />
                <span>Add category</span>
              </Button>
            </Link>
          )}
          {dataType === "admin" && (
            <Link to="/admin/add">
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex bg-transparent border-gray-500 focus:ring-0 focus:ring-gray-300 hover:bg-gray-100"
              >
                <IconPlus /> Add admin
              </Button>
            </Link>
          )}
          {dataType === "post" && (
            <Link to="/post/add">
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex bg-transparent border-gray-500 focus:ring-0 focus:ring-gray-300 hover:bg-gray-100"
              >
                <IconPlus /> Add post
              </Button>
            </Link>
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border mb-5 border-gray-300">
        <Table className="min-w-full">
          <TableHeader className="bg-cyan-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // Add this class for alternating row colors
                  className="even:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-[10px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
