import { useContext, useState } from "react";
import {
  KaryawanContext,
  PenilaianContext,
} from "../store/createcontext/divisi.context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Search, Calendar } from "lucide-react";

export function Reports() {
  // import context
  const { penilaian } = useContext(PenilaianContext);
  const { karyawans } = useContext(KaryawanContext);
  const [query, setQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [year, setYear] = useState("");

  // join tabel
  const karyawanMap = Object.fromEntries(karyawans.map((k) => [k.id, k.nama]));
  const data = penilaian.map((p) => {
    return {
      ...p,
      karyawan: karyawanMap[p.karyawanId],
    };
  });

  // simpan data ke variabel
  const karyawan = [...new Set(data.map((s) => s.karyawan))];
  const tahun = [...new Set(data.map((s) => s.tahun))];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Autocomplete
  const suggestions = query
    ? karyawan.filter((e) => e.toLowerCase().includes(query.toLowerCase()))
    : [];

  // Filter karyawan dan tahun
  const filtered = data.filter(
    (s) => s.karyawan === selectedEmployee && s.tahun === parseInt(year)
  );

  // chart
  const chartData = bulan.map((m) => {
    const found = filtered.find((s) => s.bulan === m);
    return { month: m, score: found ? found.totalSkor : 0 };
  });

  return (
    <div className="p-4 bg-white rounded-2xl shadow relative">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex flex-col relative w-100">
          <div className="flex items-center gap-2">
            <Search className="w-6 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari karyawan..."
              value={query || selectedEmployee}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedEmployee("");
              }}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          {suggestions.length > 0 && !selectedEmployee && (
            <ul className="absolute top-9 left-6 bg-white border rounded shadow w-40 z-10">
              {suggestions.map((emp, i) => (
                <li
                  key={i}
                  className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setQuery(emp);
                  }}
                >
                  {emp}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Pilih tahun</option>
            {tahun.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedEmployee && year ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" name="Score" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 py-10">
          Tolong pilih karyawan dan tahun terlebih dahulu.
        </p>
      )}
    </div>
  );
}
