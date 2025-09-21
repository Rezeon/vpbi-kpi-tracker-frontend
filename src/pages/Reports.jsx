import { useContext, useState } from "react";
import {
  DivisiContext,
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
import { useAuthUser } from "../utils/authUser";
import { User } from "lucide-react";
import LoadingPage from "../components/loading/loading";
import { useUser } from "@clerk/clerk-react";

export function Reports() {
  // import context
  const { userLogin, loading } = useAuthUser();
  const { user } = useUser();
  const { penilaian } = useContext(PenilaianContext);
  const { divisi } = useContext(DivisiContext);
  const { karyawans } = useContext(KaryawanContext);
  const [query, setQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [year, setYear] = useState("");

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  }

  if (!userLogin) return null;

  // join tabel
  const karyawanMap = Object.fromEntries(karyawans.map((k) => [k.id, k.nama]));
  const data = penilaian.map((p) => {
    return {
      ...p,
      karyawan: karyawanMap[p.karyawanId],
    };
  });

  // simpan data ke variabel
  const karyawanData = [...new Set(data.map((s) => s.karyawan))];
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

  const anggotaTim =
    userLogin?.role === "user"
      ? divisi
          .find((d) => d.id === userLogin?.karyawan?.divisiId)
          ?.karyawan.map((i) => i.nama)
      : userLogin.divisiLeader.karyawan.map((i) => i.nama);

  //const divisiLeader =
  //  userLogin?.role === "admin"
  //    ? divisi.flatMap((d) => d.karyawan)
  //    : divisi
  //        .filter((d) => d.leaderId === userLogin.id)
  //        .flatMap((d) => d.karyawan);
  // Autocomplete
  const suggestions = query
    ? anggotaTim.filter((e) => e.toLowerCase().includes(query.toLowerCase()))
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

  console.log(divisi.find((d) => d.id === userLogin?.karyawan?.divisiId));
  const avatar = user.imageUrl;
  const name = userLogin.karyawan.nama;
  const username = userLogin.username;
  const email = userLogin.email;
  const position = userLogin.karyawan.posisi;
  const department = `Departemen ${
    userLogin?.role === "admin"
      ? userLogin.divisiLeader.nama
      : divisi.find((d) => d.id === userLogin?.karyawan?.divisiId)?.nama
  }`;
  const joinSince = userLogin.karyawan.tanggalMasuk;
  const teamMembers =
    userLogin?.role === "admin"
      ? userLogin.divisiLeader.karyawan.length
      : divisi.find((d) => d.id === userLogin?.karyawan?.divisiId).karyawan
          .length;
  const anggota =
    userLogin?.role === "admin"
      ? userLogin.divisiLeader.karyawan
      : divisi.find((d) => d.id === userLogin?.karyawan?.divisiId).karyawan;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mb-4">
        <div className="col-span-1 md:col-span-4">
          <div className="w-full bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="mb-4">Profil Team Leader</h2>
              {avatar ? (
                <img
                  src={user?.imageUrl}
                  alt={`${name} avatar`}
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-md"
                />
              ) : (
                <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gray-100 ring-4 ring-white shadow-md">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {name}
              </h3>
              <p className="text-sm text-gray-500">@{username}</p>
              <p className="text-sm text-gray-500">{email}</p>

              <p className="mt-2 text-sm text-indigo-600 font-medium">
                {position}
              </p>
              <p className="text-sm text-gray-600">{department}</p>

              <div className="mt-5 w-full grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex flex-col items-center justify-center">
                  <span className="font-semibold">
                    {joinSince.split("T")[0]}
                  </span>
                  <span className="text-xs text-gray-500">Bergabung Sejak</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="font-semibold">{teamMembers}</span>
                  <span className="text-xs text-gray-500">Anggota Tim</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-8">
          <div className="w-full h-full min-h-[300px] bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-gray-400 shadow p-4">
            <h2 className="mb-4">Tabel Daftar Anggota</h2>
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    Nama
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    Total Matriks
                  </th>
                </tr>
              </thead>
              <tbody>
                {anggota.map((data) => (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                      {data.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                      {data.nama}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                      {data.matriks.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-2xl shadow relative">
        <h2 className="mb-4">Grafik Skor per Anggota</h2>
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
    </>
  );
}
