import React, { useContext, useEffect, useState } from "react";
import { useDivisiKpi } from "../api/divisiKpi";
import { DivisiContext, PenilaianContext } from "./createcontext/divisi.context";
import toast from "react-hot-toast";

export function DivisiProvider({ children }) {
  const { getAll, getById, remove, update, create } = useDivisiKpi();
  const {penilaian} = useContext(PenilaianContext)
  const [divisi, setDivisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nail, setNail] = useState(null);

  useEffect(() => {
    async function fetchDivisi() {
      try {
        setLoading(true);
        const res = await getAll();
        setDivisi(res.data);
      } catch (err) {
        console.error("Error fetching divisi:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDivisi();
  }, [penilaian]);

  const handleDelete = async (data) => {
    try {
      await remove(data);
      setDivisi((prev) => prev.filter((item) => item.data !== data));
    } catch (err) {
      console.error("Gagal delete:", err);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setDivisi((prev) => [...prev, res.data]);
    } catch (err) {
      toast.error("Gagal create:", err);
      setError(err);
      throw err;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setDivisi((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <DivisiContext.Provider
      value={{
        divisi,
        loading,
        error,
        setDivisi,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
        setNail,
      }}
    >
      {children}
    </DivisiContext.Provider>
  );
}
