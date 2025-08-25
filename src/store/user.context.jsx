import React, { useEffect, useState } from "react";
import { UserContext } from "./createcontext/divisi.context";
import { useUserKpi } from "../api/userKpi";
import toast from "react-hot-toast";

export function UserProvider({ children }) {
  const { getAll, getById, remove, update, create } = useUserKpi();

  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await getAll();
        setuser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setuser((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal delete:", err);
      setError(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await create(data);
      setuser((prev) => [...prev, res.data]);
    } catch (err) {
      const backendMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan";

      toast.error(backendMessage);
      setError(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setuser((prev) => prev.map((item) => (item.id === id ? res.data : item)));
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        handleDelete,
        handleCreate,
        handleUpdate,
        getById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
