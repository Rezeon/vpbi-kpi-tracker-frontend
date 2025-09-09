import { useState, useContext } from "react";
import {
  DivisiContext,
  MatriksContext,
} from "../store/createcontext/divisi.context";
import toast from "react-hot-toast";

export default function EmployeeTasksForm({ userLogin }) {
  const now = new Date();
  const monthName = now.toLocaleString("id-ID", { month: "long" }); //untuk mendapatkan bulan 
  const year = now.getFullYear(); // untuk mendapatkan tahun
  const [form, setForm] = useState({
    karyawanId: "",
    namaKPI: "",
    deskripsi: "",
    bobot: "",
    tahun: year,
    bulan: monthName,
  });
  const { handleCreate } = useContext(MatriksContext);
  const { divisi } = useContext(DivisiContext);
  const [selectedDivisi, setSelectedDivisi] = useState("");

  const selectDivisi =
    userLogin?.role === "admin"
      ? divisi?.find((d) => d.id === Number(selectedDivisi))
      : userLogin?.divisiLeader; // fungsi ini agar bisa membedakan admin dan user atau leader karena admin butuh semua data
  const today = new Date().toISOString().split("T")[0]; // mendpatkan data hari ini 

  const [dueDate, setDueDate] = useState(today);

  const pointsOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        karyawanId: Number(form.karyawanId),
        namaKPI: form.namaKPI,
        deskripsi: form.deskripsi,
        bobot: Number(form.bobot),
        bulan: form.bulan,
        tahun: Number(form.tahun),
      };

      await handleCreate(payload);
      setForm({
        karyawanId: "",
        namaKPI: "",
        deskripsi: "",
        bobot: "",
        bulan: monthName,
        tahun: year,
      });
      toast.success("Matriks berhasil ditambahkan!");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal menambahkan matriks.";
      toast.error(message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 font-sans w-full">
      <h2 className="text-xl font-semibold mb-6">Add Employee Task</h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Division */}
        {userLogin?.role === "admin" ? (
          <div className="w-full group">
            <label className="block mb-1 font-medium">Select Division</label>
            <select
              value={selectedDivisi}
              onChange={(e) => setSelectedDivisi(e.target.value)}
              className="w-full bg-transparent px-2 py-2 focus:outline-none"
            >
              <option value="" disabled hidden>
                {" "}
                Select employe
              </option>
              {divisi.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nama}
                </option>
              ))}
            </select>
            <div
              className={`h-1 rounded-2xl transition-all duration-300 
              ${
                selectedDivisi ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"
              }`}
            />
          </div>
        ) : (
          <div className="w-full h-auto rounded-2xl gap-2 bg-blue-600 text-[1rem] font-semibold font-sans flex items-center justify-between">
            <p className=" h-full rounded-2xl text-white shadow pl-6 ">
              Division
            </p>
            <p className="text-white font-semibold font-sans pr-6 h-full transition-all duration-300 ">
              {userLogin?.divisiLeader?.nama || "tidak ada divisi"}
            </p>
          </div>
        )}

        {/* Employee */}
        <div className="w-full group">
          <label className="block mb-1 font-medium">Assign Employee</label>
          <select
            value={form.karyawanId}
            onChange={(e) => setForm({ ...form, karyawanId: e.target.value })}
            className="w-full bg-transparent px-2 py-2 focus:outline-none"
            required
            disabled={!selectDivisi?.karyawan?.length}
          >
            <option value="" disabled hidden>
              {" "}
              Select employe
            </option>
            {selectDivisi?.karyawan?.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nama}
              </option>
            ))}
          </select>
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${
                form.karyawanId ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"
              }`}
          />
        </div>

        {/* Points */}
        <div className="w-full group">
          <label className="block mb-1 font-medium">Points</label>
          <select
            value={form.bobot}
            onChange={(e) => setForm({ ...form, bobot: e.target.value })}
            className="w-full bg-transparent px-2 py-2 focus:outline-none"
            required
          >
            <option value="" disabled hidden>
              Select points
            </option>
            {pointsOptions.map((p) => (
              <option key={p} value={p}>
                +{p}
              </option>
            ))}
          </select>
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${form.bobot ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"}`}
          />
        </div>

        {/* Task */}
        <div className="w-full group">
          <label className="block mb-1 font-medium">Task</label>
          <input
            value={form.namaKPI}
            onChange={(e) => setForm({ ...form, namaKPI: e.target.value })}
            className="w-full bg-transparent px-2 py-2 focus:outline-none resize-none"
            placeholder="Enter name KPI"
            rows={3}
            required
          />
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${form.namaKPI ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"}`}
          />
        </div>

        <div className="w-full group">
          <label className="block mb-1 font-medium">Task</label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="w-full bg-transparent px-2 py-2 focus:outline-none resize-none"
            placeholder="Enter task description"
            rows={3}
            required
          />
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${
                form.deskripsi ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"
              }`}
          />
        </div>

        {/* Due Date */}
        <div className="w-full group">
          <label className="block mb-1 font-medium">Created add</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-transparent px-2 py-2 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
