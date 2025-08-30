import React, { useContext, useState, useMemo } from "react";
import { KaryawanContext } from "../store/createcontext/divisi.context";
import { DivisiContext } from "../store/createcontext/divisi.context";
import { UserContext } from "../store/createcontext/divisi.context";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function Karyawan() {
  const { karyawans, loading, error } = useContext(KaryawanContext);
  const { divisi } = useContext(DivisiContext);
  const { user } = useContext(UserContext);

  const divisiMap = Object.fromEntries(divisi.map((d) => [d.id, d.nama]));
  const userMap = Object.fromEntries(user.map((d) => [d.id, d.username]));
  const data = karyawans.map((emp) => ({
    ...emp,
    divisi: divisiMap[emp.divisiId] || "Unknown",
    user: userMap[emp.userId] || "-",
  }));

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "nama",
        header: "Nama",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "posisi",
        header: "Posisi",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "divisi",
        header: "Divisi",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "user",
        header: "User",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={`/karyawan/edit/${row.original.id}`}
          >
            Edit
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Data Karyawan</h2>
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="mb-4 w-1/4 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring"
          />
          <Link
            to="/karyawan/add"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Tambah Data
          </Link>
        </div>
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ⏪
          </button>

          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`px-3 py-1 rounded ${
                table.getState().pagination.pageIndex === i
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ⏩
          </button>
        </div>
      </div>
    </div>
  );
}
