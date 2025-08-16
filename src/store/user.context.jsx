import React, { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"; 

const UserCOntext = createContext();

export function UserProvider({ children }) {
  const { getAll, getById, remove, update, create } = useUser();

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
      console.error("Gagal create:", err);
      setError(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await update(id, data);
      setuser((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Gagal update:", err);
      setError(err);
    }
  };

  return (
    <UserCOntext.Provider
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
    </UserCOntext.Provider>
  );
}
