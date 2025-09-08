import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { KaryawanContext } from "../store/createcontext/divisi.context";
import { DivisiContext } from "../store/createcontext/divisi.context";
import { UserContext } from "../store/createcontext/divisi.context";
import LoadingPage from "../components/loading/loading";

export function EditKaryawan() {
  const { id } = useParams();
  const { karyawans, loading, error, handleUpdate } =
    useContext(KaryawanContext);
  const { divisi } = useContext(DivisiContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const row = karyawans.find((r) => r.id === Number(id));
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    posisi: "",
    divisiId: "",
    userId: "",
    tanggalMasuk: "",
    email: "",
  });

  useEffect(() => {
    if (row)
      setFormData({
        ...row,
        tanggalMasuk: row.tanggalMasuk ? row.tanggalMasuk.slice(0, 10) : "",
      });
  }, [row]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataKaryawan = {
      ...formData,
      divisiId: Number(formData.divisiId),
      userId: Number(formData.userId),
    };
    handleUpdate(formData.id, dataKaryawan);
    navigate("/karyawan");
  };

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!row) return <p>Not Found</p>;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 p-4">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl w-full">
          <h2 className="text-xl font-semibold mb-6">Tambah Karyawan</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Posisi</label>
            <input
              type="text"
              name="posisi"
              value={formData.posisi}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Divisi</label>
            <select
              name="divisiId"
              value={formData.divisiId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 bg-white"
            >
              {divisi.map((divisi) => (
                <option key={divisi.id} value={divisi.id}>
                  {divisi.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tanggal Masuk
            </label>
            <input
              type="date"
              name="tanggalMasuk"
              value={formData.tanggalMasuk}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">User</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 bg-white"
            >
              <option>-- Pilih User --</option>
              {user.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-5"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
