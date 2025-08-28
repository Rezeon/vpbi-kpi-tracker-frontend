import React, { useContext, useState } from "react";
import {
  KaryawanContext,
  DivisiContext,
  UserContext,
} from "../store/createcontext/divisi.context";

export function AddKaryawan() {
  const { handleCreate } = useContext(KaryawanContext);
  const { divisi } = useContext(DivisiContext);
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    divisiId: "",
    userId: "",
    tanggalMasuk: "",
    email: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const dataKaryawan = {
      ...formData,
      divisiId: Number(formData.divisiId),
      userId: Number(formData.userId),
    };
    handleCreate(dataKaryawan);
    setFormData({
      nama: "",
      posisi: "",
      divisiId: "",
      userId: "",
      tanggalMasuk: "",
      email: "",
    });
  }

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
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
