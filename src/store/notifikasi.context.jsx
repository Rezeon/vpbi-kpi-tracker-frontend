import React, { useState, useEffect, useContext } from "react";
import { useNotifikasi } from "../api/notifikasi"; 
import { NotifikasiContext } from "./createcontext/divisi.context";

export function NotifikasiProvider({ children }) {
  const { getById, update, create } = useNotifikasi();

  const [notifikasi, setNotifikasi] = useState([]);
  const [error, setError] = useState(null);

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

  const updateNotif = async (id, data) => {
    try {
      const res = await update(id, data);
      const updatedNotif = res.data;
      setNotifikasi((prev) =>
        prev.map((notif) => (notif.id === id ? updatedNotif : notif))
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
        getNotifById,
        updateNotif
      }}
    >
      {children}
    </NotifikasiContext.Provider>
  );
}

export const useNotifikasiContext = () => useContext(NotifikasiContext);
