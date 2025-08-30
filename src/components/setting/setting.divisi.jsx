import toast from "react-hot-toast";
import {
  DivisiContext,
  UserContext,
} from "../../store/createcontext/divisi.context";
import { useState, useEffect, useContext } from "react";

export function SettingDivisi() {
  const {
    divisi,
    loading,
    error,
    setDivisi,
    handleDelete,
    handleCreate,
    handleUpdate,
    getById,
  } = useContext(DivisiContext);
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    leaderId: null,
  });
  const [formDel, setFormDel] = useState({
    id: null,
  });

  const handleSelectDelete = async (id) => {
    if (!id) {
      toast.error("Error when selecting division!");
      return;
    }

    try {
      await handleDelete(id);
      toast.success("Division deleted successfully!");

      setForm({ nama: "", deskripsi: "", leaderId: null });
      setSelectedDivisiId(null);
    } catch (err) {
      console.error("Gagal delete:", err);
      toast.error("Gagal menghapus Division.");
    }
  };

  const [selectedDivisiId, setSelectedDivisiId] = useState(null);

  const handleSelectDivisi = async (id) => {
    setSelectedDivisiId(id);
    if (!id) {
      setForm({ nama: "", deskripsi: "", leaderId: null });
      return;
    }
    try {
      const data = await getById(id);
      setForm({
        nama: data.data.nama,
        deskripsi: data.data.deskripsi,
        leaderId: data.data.leaderId,
      });
    } catch (err) {
      console.error("Gagal ambil divisi:", err);
      toast.error("Gagal load data divisi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.leaderId) {
      toast.error("Leader harus dipilih!");
      return;
    }

    try {
      console.log("Final data:", form);
      const id = selectedDivisiId;
      if (selectedDivisiId) {
        await handleUpdate(id, form);
        toast.success("Division updated successfully!");
      } else {
        await handleCreate(form);
        toast.success("Division added successfully!");
      }

      setForm({ nama: "", deskripsi: "", leaderId: null });
      setSelectedDivisiId(null);
    } catch (err) {
      console.error("Gagal submit:", err);
      toast.error("Gagal menyimpan Division.");
    }
  };

  return (
    <div className="w-full h-auto p-1 font-sans">
      <form
        className="bg-white rounded-2xl p-3 shadow flex flex-col items-start gap-4 relative"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-auto p-3 flex flex-col gap-4">
          <label className="w-full p-1 font-medium">
            Select Division for Update
          </label>
          <select
            value={selectedDivisiId ?? ""}
            onChange={(e) => handleSelectDivisi(Number(e.target.value))}
            className="w-fit bg-transparent px-2 py-2 focus:outline-none text-black"
          >
            <option value="">Create new division</option>
            {divisi?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama}
              </option>
            ))}
          </select>
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${form.leaderId ? "bg-blue-500 w-[10%]" : "bg-gray-400 w-[5%]"}`}
          />
        </div>
        <label className="w-full p-1 text-2xl font-bold">
          {selectedDivisiId ? "Update Division" : "Create Division"}
        </label>
        <div className="w-full h-auto p-3 flex flex-col gap-4">
          <label className="w-full p-1 font-medium">Select Leader</label>
          <select
            value={form.leaderId ?? null}
            onChange={(e) =>
              setForm({ ...form, leaderId: Number(e.target.value) })
            }
            className="w-fit bg-transparent px-2 py-2 focus:outline-none text-black"
            required
          >
            <option value={null} disabled hidden>
              Select employee
            </option>
            {user
              ?.filter((emp) => emp.role === "leader") 
              .map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.username}
                </option>
              ))}
          </select>
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${form.leaderId ? "bg-blue-500 w-[10%]" : "bg-gray-400 w-[5%]"}`}
          />
        </div>
        <div className="w-full h-auto p-3 flex flex-col gap-4">
          <label className="block mb-1 font-medium ">Name Division</label>
          <input
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full bg-transparent px-2 py-2 focus:outline-none"
            placeholder="Enter division name"
            required
          />
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${form.nama ? "bg-blue-500 w-[10%]" : "bg-gray-400 w-[5%]"}`}
          />
        </div>
        <div className="w-full h-auto p-3 flex flex-col gap-4">
          <label className="block mb-1 font-medium ">Name Division</label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="w-full bg-transparent px-2 py-2 focus:outline-none resize-none "
            placeholder="Enter division description"
            rows={3}
            required
          />
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${form.deskripsi ? "bg-blue-500 w-[70%]" : "bg-gray-400 w-[5%]"}`}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {selectedDivisiId ? "Update Division" : "Create Division"}
        </button>
        {selectedDivisiId && (
          <button
            type="button"
            onClick={() => handleSelectDelete(selectedDivisiId)}
            className="px-4 py-2 font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete Division
          </button>
        )}
      </form>
    </div>
  );
}
