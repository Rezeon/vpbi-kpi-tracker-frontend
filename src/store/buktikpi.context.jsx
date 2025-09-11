import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useBuktiKpiService } from "../api/buktiKpi";
import { BuktiContext } from "./createcontext/divisi.context";

export function BuktiProvider({ children }) {
  const { getAll, getById, remove, update, create } = useBuktiKpiService();
  const [bukti, setBukti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDivisi() {
      try {
        setLoading(true);
        const res = await getAll();
        setBukti(res.data);
      } catch (err) {
        console.error("Error fetching bukti:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDivisi();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setBukti((prev) => prev.filter((item) => item.id !== id));
      toast.success("Data berhasil dihapus");
    } catch (err) {
      console.error("Gagal delete:", err);
      const errorMsg =
        typeof err?.response?.data?.error === "string"
          ? err.response.data.error
          : err.message || "Gagal menghapus data";

      toast.error(errorMsg);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setBukti((prev) => [...prev, res.data]);
    } catch (err) {
      toast.error(
        error?.response?.data?.error || error.message || "Gagal menghapus data"
      );
      setError(err);
      throw err;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setBukti((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <BuktiContext.Provider
      value={{
        bukti,
        loading,
        error,
        setBukti,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </BuktiContext.Provider>
  );
}
