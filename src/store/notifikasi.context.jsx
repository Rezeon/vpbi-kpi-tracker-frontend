import React, { createContext, useState } from "react";
import { useNotifikasi } from "../api/notifikasi"; 

const NotifikasiContext = createContext();

export function NotifikasiProvider({ children }) {
  const {  getById, update, create } = useNotifikasi();

  const [notifikasi, setNotifikasi] = useState([]);
  const [error, setError] = useState(null);

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
