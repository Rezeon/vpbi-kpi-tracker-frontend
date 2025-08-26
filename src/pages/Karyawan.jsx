import { Table } from "../components/Table";
import React, { useContext } from "react";
import { KaryawanContext } from "../store/createcontext/divisi.context";

const defaultColumns = [
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
];

export function Karyawan() {
  const { karyawans, loading, error } = useContext(KaryawanContext);

  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div class="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Data Karyawan</h2>
      <Table data={karyawans} columns={defaultColumns} />
    </div>
  );
}
