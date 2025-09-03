import React, { useEffect, useState } from "react";
import { useMatriksKpi } from "../api/matriksKpi";
import { MatriksContext } from "./createcontext/divisi.context";

export function MatrikProvider({ children }) {
  const { getAll, getById, remove, update, create } = useMatriksKpi();

  const [matriks, setMatriks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatrik = async () => {
    try {
      setLoading(true);
      const res = await getAll();
      setMatriks(res.data);
    } catch (err) {
      console.error("Error fetching matriks:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMatrik();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setMatriks((prev) => prev.filter((item) => item.id !== id));
      await fetchMatrik()
    } catch (err) {
      console.error("Gagal delete:", err);
      setError(err);
      throw err;
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setMatriks((prev) => [...prev, res.data]);
      await fetchMatrik()
    } catch (err) {
      console.error("Gagal create:", err.message);
      setError(err);
      throw err;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setMatriks((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
      fetchMatrik()
    } catch (err) {
      console.error("Gagal update:", err.message);
      setError(err);
    }
  };

  return (
    <MatriksContext.Provider
      value={{
        matriks,
        loading,
        error,
        setMatriks,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </MatriksContext.Provider>
  );
}
