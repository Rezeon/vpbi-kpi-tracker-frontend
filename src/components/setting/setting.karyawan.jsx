import { useContext, useState } from "react";
import { KaryawanContext } from "../../store/createcontext/divisi.context";

export function SettingKaryawan() {
  const {
    karyawans,
    loading,
    error,
    handleDelete,
    handleCreate,
    handleUpdate,
    getById,
  } = useContext(KaryawanContext);

  const [form, setForm] = useState({
    
  })


  return (
    <div>

    </div>
  );
}
