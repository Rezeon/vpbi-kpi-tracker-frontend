import React, { createContext, useEffect, useState } from "react";
import { useDetailKpi } from "../api/detailKpi";

const DetailContext = createContext();

export function DetailProvider({ children }) {
  const { getAll, getById, remove, update, create } = useDetailKpi();

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const res = await getAll();
        setDetail(res.data); 
      } catch (err) {
        console.error("Error fetching detail:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setDetail((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal delete:", err);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setDetail((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Gagal create:", err);
      setError(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setDetail((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <DetailContext.Provider
      value={{
        detail,
        loading,
        error,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}
