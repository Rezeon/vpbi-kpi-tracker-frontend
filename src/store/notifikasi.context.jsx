import React, { useState, useEffect, useContext } from "react";
import { useNotifikasi } from "../api/notifikasi"; 
import { NotifikasiContext } from "./createcontext/divisi.context";

export function NotifikasiProvider({ children }) {
  const {  getById, update, create } = useNotifikasi();

  const [notifikasi, setNotifikasi] = useState([]);
  const [error, setError] = useState(null);

  const testmyarray = [
    { id: 1, judul: "Email", message: "Notifikasi 1 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 2, judul: "SMS", message: "Notifikasi 2 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 3, judul: "Push", message: "Notifikasi 3 belum terbaca", status: false, createdAt: "2024-10-01T10:00:00Z" },
    { id: 4, judul: "Email", message: "Notifikasi 4 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 5, judul: "SMS", message: "Notifikasi 5 belum terbaca", status: false, createdAt: "2024-10-01T10:00:00Z" },
    { id: 6, judul: "Push", message: "Notifikasi 6 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 7, judul: "Email", message: "Notifikasi 7 belum terbaca dan pesan berlebih", status: false, createdAt: "2024-10-01T10:00:00Z" },
  ];


  useEffect(() => {
    // nge-fetch data notifikasi berdasarkan userId
    const userId = 123; // nanti disesuaikan dengan user yang login
    const fetchData = async () => {
      try {
        //const res = await getById(userId);
        setNotifikasi(testmyarray); // respon dari backend(ini niatnya nge-fetch cmn lagi testing)
      } catch (err) {
        console.error("gagal fetch:", err);
        setError(err);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (userId) => {
    try {
      const res = await create(userId);
      setNotifikasi((prev) => [...prev, res.userId]);
    } catch (err) {
      console.error("Gagal create:", err);
      setError(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setNotifikasi((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <NotifikasiContext.Provider
      value={{
        notifikasi,
        setNotifikasi,
        error,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </NotifikasiContext.Provider>
  );
}

export const useNotifikasiContext = () => useContext(NotifikasiContext);
