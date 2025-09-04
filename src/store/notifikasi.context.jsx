import React, { useState, useEffect, useContext } from "react";
import { useNotifikasi } from "../api/notifikasi"; 
import { NotifikasiContext } from "./createcontext/divisi.context";

export function NotifikasiProvider({ children }) {
  const { getById, update, create } = useNotifikasi();

  const [notifikasi, setNotifikasi] = useState([]);
  const [error, setError] = useState(null);

  const testmyarray = [
    { id: 1, judul: "Email", pesan: "Notifikasi 1 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 2, judul: "SMS", pesan: "Notifikasi 2 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 3, judul: "Push", pesan: "Notifikasi 3 belum terbaca", status: false, createdAt: "2024-10-01T10:00:00Z" },
    { id: 4, judul: "Email", pesan: "Notifikasi 4 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 5, judul: "SMS", pesan: "Notifikasi 5 belum terbaca", status: false, createdAt: "2024-10-01T10:00:00Z" },
    { id: 6, judul: "Push", pesan: "Notifikasi 6 sudah terbaca", status: true, createdAt: "2024-10-01T10:00:00Z" },
    { id: 7, judul: "Email", pesan: "Notifikasi 7 belum terbaca dan peasdfsadfsadfsdafasdfsadfdsafasdfsdfsan sadhfkjdfgkadshfghfgsdfgadsiyufiysdgfidgsfiadgsyadgsadgsfadgfiydfberlebih", status: false, createdAt: "2024-10-01T10:00:00Z" },
  ];

  const getNotifById = async (userId) => {
    try {
      const res = await getById(userId);
      setNotifikasi(res.data);
    }
    catch (err) {
      console.error("Gagal get by id:", err);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      const newNotif = res.data;
      setNotifikasi((prev) => [...prev, newNotif]);
    } catch (err) {
      console.error("Gagal create:", err);
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
        getNotifById,
      }}
    >
      {children}
    </NotifikasiContext.Provider>
  );
}

export const useNotifikasiContext = () => useContext(NotifikasiContext);
