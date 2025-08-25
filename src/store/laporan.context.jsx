import React, { useEffect, useState } from "react";
import { useLaporanKpi } from "../api/laporanKpi"; 
import { LaporanContext } from "./createcontext/divisi.context";


export function LaporanProvider({ children }) {
  const { getAll, getById, remove, update, create } = useLaporanKpi();

  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLaporan() {
      try {
        setLoading(true);
        const res = await getAll();
        setLaporan(res.data); 
      } catch (err) {
        console.error("Error fetching laporan:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLaporan();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setLaporan((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal delete:", err);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setLaporan((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Gagal create:", err);
      setError(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setLaporan((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <LaporanContext.Provider
      value={{
        laporan,
        loading,
        error,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </LaporanContext.Provider>
  );
}
