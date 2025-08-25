import { useState, useEffect, useContext } from "react";
import {
  DivisiContext,
  MatriksContext,
} from "../store/createcontext/divisi.context";
import toast from "react-hot-toast";

export default function EmployeeTasksForm() {
  const [form, setForm] = useState({
    namaKPI: "",
    deskripsi: "",
    bobot: 0,
  });

  const { divisi, getById: getDivisiById } = useContext(DivisiContext);
  const {
    matriks,
    handleCreate,
    handleUpdate,
    handleDelete,
    getById: getMatriksById,
  } = useContext(MatriksContext);

  const today = new Date().toISOString().split("T")[0];

  const [divisiId, setDivisiId] = useState("");
  const [divisiDetail, setDivisiDetail] = useState(null);
  const [dueDate, setDueDate] = useState(today);

  const [employee, setEmployee] = useState("");
  const [points, setPoints] = useState("");
  const [task, setTask] = useState("");
  const [collaborators, setCollaborators] = useState([]);

  const pointsOptions = [10, 20, 30, 50];

  useEffect(() => {
    if (divisiId) {
      const fetchDivisi = async () => {
        try {
          const detail = await getDivisiById(divisiId);
          setDivisiDetail(detail.data);
        } catch (err) {
          toast.error("Gagal ambil divisi detail:", err);
          setDivisiDetail(null);
        }
      };
      fetchDivisi();
    } else {
      setDivisiDetail(null);
    }
  }, [divisiId, getDivisiById]);

  const handleCollaboratorChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCollaborators([...collaborators, value]);
    } else {
      setCollaborators(collaborators.filter((c) => c !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        namaKPI: form.namaKPI,
        deskripsi: form.deskripsi,
        bobot: Number(form.bobot),
      };

      console.log("Final payload:", payload);
      await handleCreate(payload);
      toast.success("Matriks berhasil ditambahkan!");
    } catch (err) {
      toast.error("Gagal menambahkan matriks.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 font-sans w-1/4">
      <h2 className="text-xl font-semibold mb-6">Add Employee Task</h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Division */}
        <div className="w-full group">
          <label className="block mb-1 font-medium">Division</label>
          <select
            value={divisiId}
            onChange={(e) => setDivisiId(e.target.value)}
            className="w-full bg-transparent px-2 py-2 focus:outline-none"
            required
          >
            <option value="" disabled hidden>
              Select divisi
            </option>
            {divisi?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama}
              </option>
            ))}
          </select>
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${divisiId ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"}`}
          />
        </div>

        {/* Employee */}
        <div className="w-full group">
          <label className="block mb-1 font-medium">Assign Employee</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="w-full bg-transparent px-2 py-2 focus:outline-none"
            required
            disabled={!divisiDetail}
          >
            <option value="" disabled hidden>
              {divisiDetail ? "Select employee" : "Select divisi first"}
            </option>
            {divisiDetail?.karyawan?.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nama}
              </option>
            ))}
          </select>
          <div
            className={`h-1 rounded-2xl transition-all duration-300 
              ${employee ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"}`}
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
              ${form.deskripsi ? "bg-blue-500 w-[100%]" : "bg-gray-400 w-[11%]"}`}
          />
        </div>

        {/* Collaborators */}
        {divisiDetail && (
          <div>
            <label className="block mb-1 font-medium">Collaborators</label>
            <div className="flex h-[130px] pt-2 pb-2 flex-col gap-3 overflow-y-scroll custom-scrollbar">
              {divisiDetail.karyawan?.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={c.nama}
                    checked={collaborators.includes(c.nama)}
                    onChange={handleCollaboratorChange}
                    className="h-4 w-4 rounded-full border border-gray-400 checked:bg-blue-500 checked:border-blue-500"
                  />
                  <span className="font-semibold w-auto px-4 py-1 bg-blue-500 text-white rounded-2xl">
                    {c.nama}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Due Date */}
        <div className="w-full group">
          <label className="block mb-1 font-medium">Due Date</label>
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
