import React, { createContext, useEffect, useState } from "react";
import { usePenilaian } from "../api/penilaianKpi"; 

const PenilaianContext = createContext();

export function PenilaianProvider({ children }) {
  const { getAll, getById, remove, update, create } = usePenilaian();

  const [penilian, setPenilaian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPenilaian() {
      try {
        setLoading(true);
        const res = await getAll();
        setPenilaian(res.data); 
      } catch (err) {
        console.error("Error fetching penilian:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPenilaian();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setPenilaian((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal delete:", err);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setPenilaian((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Gagal create:", err);
      setError(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setPenilaian((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <PenilaianContext.Provider
      value={{
        penilian,
        loading,
        error,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </PenilaianContext.Provider>
  );
}
