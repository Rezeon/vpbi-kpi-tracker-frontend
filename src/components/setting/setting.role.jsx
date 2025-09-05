import { useContext, useState } from "react";
import { UserContext } from "../../store/createcontext/divisi.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const createRole = {
  role: [
    { nama: "User", object: "user" },
    { nama: "Leader", object: "leader" },
  ],
};

export function SetingRole() {
  const navigate = useNavigate()
  const { handleCreate } = useContext(UserContext);
  const [form, setForm] = useState({
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        role: form.role,
      };

      console.log("Final data:", data);
      await handleCreate(data);
      toast.success("Role berhasil ditambahkan!");
      navigate("/dashboard")
    } catch (err) {
      toast.error("Gagal menambahkan role.");
    }
  };

  return (
    <div className="w-full h-auto p-3 font-sans">
      <form
        className="bg-white rounded-2xl p-3 shadow flex flex-col items-start gap-4 relative"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-auto p-3 flex flex-col gap-4">
          <label className="w-full p-1 text-2xl font-bold">Create Role first</label>

          <select
            className="w-fit bg-transparent px-2 py-2 focus:outline-none"
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="" disabled hidden>
              Select role
            </option>
            {createRole.role.map((d, i) => (
              <option key={i} value={d.object}>
                {d.nama}
              </option>
            ))}
          </select>
          
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${form.role ? "bg-blue-500 w-[29%]" : "bg-gray-400 w-[11%]"}`}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition absolute left-[20%] top-[50%]"
        >
          Simpan Role
        </button>
      </form>
    </div>
  );
}
