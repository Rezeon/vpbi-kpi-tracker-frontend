import React, { useContext, useState, useMemo } from "react";
import { DivisiContext } from "../store/createcontext/divisi.context";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function Divisi() {
  const { divisi, loading, error, handleDelete } = useContext(DivisiContext);

  // Fake KPI data generator for demo (you can replace with real values later)
  const data = useMemo(() => {
    return divisi.map((d, index) => ({
      id: d.id,
      division: d.nama,
      kpi: d.karyawan.flatMap((k) => k.matriks).length,
      target: "100%",
      actual: d.karyawan
        .flatMap((k) => k.matriks)
        .filter((m) => m.detail && m.detail.length > 0).length,
      progress: d.karyawan
        .flatMap((k) => k.matriks)
        .filter((m) => !m.detail || m.detail.length === 0).length,
      status: d.karyawan.flatMap((k) => k.matriks).length % 2 === 0 ? "On Track" : "At Risk",
      head: d.leader.username,
    }));
  }, [divisi]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "division", header: "Division" },
      { accessorKey: "kpi", header: "KPI / Metrics" },
      { accessorKey: "target", header: "Target" },
      { accessorKey: "actual", header: "Done Task" },
      { accessorKey: "progress", header: "Progress" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "head", header: "Responsible Person" },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Link
              to={`/divisi/edit/${row.original.id}`}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting, columnFilters },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Division Dashboard</h2>

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
            to="/divisi/add"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add Division
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

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        {Array.from({ length: table.getPageCount() }, (_, i) => (
          <button
            key={i}
            onClick={() => table.setPageIndex(i)}
            className={`px-3 py-1 border rounded ${
              table.getState().pagination.pageIndex === i
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
