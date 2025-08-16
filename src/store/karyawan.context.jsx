import React, { createContext, useEffect, useState } from "react";
import { useKaryawanKpi } from "../api/karyawanKpi";

const KaryawanContext = createContext();

export function KaryawanProvider({ children }) {
  const { getAll, getById, remove, update, create } = useKaryawanKpi();

  const [karyawans, setKaryawans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchKaryawan() {
      try {
        setLoading(true);
        const res = await getAll();
        setKaryawans(res.data); 
      } catch (err) {
        console.error("Error fetching karyawans:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchKaryawan();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setKaryawans((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal delete:", err);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setKaryawans((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Gagal create:", err);
      setError(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setKaryawans((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <KaryawanContext.Provider
      value={{
        karyawans,
        loading,
        error,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </KaryawanContext.Provider>
  );
}
