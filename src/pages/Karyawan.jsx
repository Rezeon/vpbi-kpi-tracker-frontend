import React, { useContext, useState, useMemo } from "react";
import {
  KaryawanContext,
  MatriksContext,
} from "../store/createcontext/divisi.context";
import { DivisiContext } from "../store/createcontext/divisi.context";
import { UserContext } from "../store/createcontext/divisi.context";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import LoadingPage from "../components/loading/loading";

export function Karyawan() {
  // Import functions
  const { karyawans, loading, error, handleDelete } =
    useContext(KaryawanContext);
  const { divisi } = useContext(DivisiContext);
  const { matriks } = useContext(MatriksContext);
  const { user } = useContext(UserContext);

  // Join tabel
  const divisiMap = Object.fromEntries(divisi.map((d) => [d.id, d.nama]));
  const userMap = Object.fromEntries(user.map((d) => [d.id, d.username]));
  const data = karyawans.map((emp) => {
    const totalMatrik = emp.matriks?.length || 0;
    const selesaiMatrik =
      matriks?.filter((m) => m.karyawanId === emp.id && m.detail?.length > 0)
        .length || 0;
    return {
      ...emp,
      divisi: divisiMap[emp.divisiId] || "Unknown",
      user: userMap[emp.userId] || "-",
      totalMatrik,
      selesaiMatrik, // jumlah matrik yang selesai
    };
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filtering (search across all fields)
  const filteredData = useMemo(() => {
    return data.filter(
      (row) =>
        row.nama.toLowerCase().includes(search.toLowerCase()) ||
        row.posisi.toLowerCase().includes(search.toLowerCase()) ||
        row.divisi.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toString().includes(search) ||
        row.email.toString().includes(search) ||
        row.user.toString().includes(search)
    );
  }, [data, search]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // 🔼 Toggle sorting direction
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Hapus data
  function handleButtonDelete(id) {
    const confirm = window.confirm("Apakah kamu yakin untuk menghapus?");
    if (confirm) {
      handleDelete(id);
    }
  }

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Data Karyawan</h2>
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="mb-4 w-1/4 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
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
            <tr>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID{" "}
                {sortConfig.key === "id"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("nama")}
              >
                Nama{" "}
                {sortConfig.key === "nama"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("posisi")}
              >
                Posisi{" "}
                {sortConfig.key === "posisi"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("divisi")}
              >
                Divisi{" "}
                {sortConfig.key === "divisi"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortConfig.key === "email"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("user")}
              >
                User{" "}
                {sortConfig.key === "user"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>

              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("totalMatrik")}
              >
                Total Matrik{" "}
                {sortConfig.key === "totalMatrik"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>

              <th
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("selesaiMatrik")}
              >
                Matrik Selesai{" "}
                {sortConfig.key === "selesaiMatrik"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 cursor-pointer">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.nama}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.posisi}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.divisi}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.user}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.totalMatrik}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                  {data.selesaiMatrik}
                </td>

                <td className="px-4 py-2 text-sm  border-b border-gray-200 flex gap-1 text-white">
                  <Link to={`/karyawan/edit/${data.id}`}>
                    <div className="bg-blue-500 hover:bg-blue-600 p-2 font-semibold rounded w-[fit-content]">
                      <FaEdit />
                    </div>
                  </Link>
                  <button onClick={() => handleButtonDelete(data.id)}>
                    <div className="bg-red-500 hover:bg-red-600 p-2 font-semibold rounded w-[fit-content]">
                      <FaTrash />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                i + 1 === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
