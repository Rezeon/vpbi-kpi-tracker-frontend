import { useContext, useState } from "react";
import {
  DetailContext,
  DivisiContext,
  MatriksContext,
  PenilaianContext,
} from "../../store/createcontext/divisi.context";
import toast from "react-hot-toast";
import { ChevronsDown, Settings2, Trash, Trash2 } from "lucide-react";

export function SettingPenilaian({
  userLogin,
  matriks,
  handleDelete,
  handleUpdate,
  divisi
}) {
  const date = new Date();
  const monthName = date.toLocaleString("id-ID", { month: "long" }); //untuk mendapatkan bulan
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());

  const {
    handleCreate: handleCreatePenilaian,
    handleUpdate: handleUpdatePenilaian,
    handleDelete: handleDeletePenilaianCtx,
    penilaian,
  } = useContext(PenilaianContext);

  const {
    handleCreate: handleCreateDetail,
    handleUpdate: handleUpdateDetail,
    handleDelete: handleDeleteDetail,
    detail,
  } = useContext(DetailContext);
  const [selectedMonth, setSelectedMonth] = useState(monthName);
  const monthOptions = [
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

  const [karyawanId, setKaryawanId] = useState(null);
  const [penilaianId, setPenilaianId] = useState(null);
  const [updateMatrik, setUpdateMatrik] = useState({});
  const [openDropdown, setOpenDropdown] = useState({});

  const toggleDropdown = (id) => {
    // untuk membuat dropdown matrik aggar sesuai id
    setOpenDropdown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const toggleDropdownUpdate = (matrikId, m) => {
    setUpdateMatrik((prev) => ({
      ...prev,
      [matrikId]: !prev[matrikId],
    }));
    setFormMatrik({
      namaKPI: m.namaKPI,
      deskripsi: m.deskripsi,
      bobot: m.bobot,
      matrikId: m.id,
    });
  };

  const divisiLeader =
    userLogin?.role === "admin"
      ? divisi.flatMap((d) => d.karyawan)
      : divisi
          .filter((d) => d.leaderId === userLogin.id)
          .flatMap((d) => d.karyawan); // agar membedakan admin dan user biasa, memungkinkan admin mendapat semua data

  const pointsOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const [form, setForm] = useState({
    matriksId: "",
    nilai: "",
    karyawanId: "",
  });
  const [formMatrik, setFormMatrik] = useState({
    namaKPI: "",
    deskripsi: "",
    bobot: "",
    matrikId: "",
    karyawanId: "",
  });
  const handleUpdateMatrikSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formMatrik.matrikId) {
        toast.error("Pilih matriks yang ingin diupdate");
        return;
      }

      await handleUpdate(Number(formMatrik.matrikId), {
        namaKPI: formMatrik.namaKPI,
        deskripsi: formMatrik.deskripsi,
        bobot: Number(formMatrik.bobot),
        karyawanId: Number(karyawanId),
      });

      toast.success("Matriks berhasil diupdate");

      setFormMatrik({ namaKPI: "", deskripsi: "", bobot: "", matrikId: "" });
      setUpdateMatrik({});
    } catch (err) {
      toast.error("Gagal update matriks " + err.message);
    }
  };
  const handleDeleteMatrik = async (idDetail, idMatriks) => {
    try {
      if (!idDetail || !idMatriks) {
        toast.error("Id Tidak ada");
      }
      await handleDeleteDetail(idDetail), await handleDelete(idMatriks);
      toast.success("matrik telah terhapus");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleDeletePenilaian = async (id) => {
    try {
      await handleDeletePenilaianCtx(Number(id));
      toast.success("Penilaian telah terhapus");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreate = async (id) => {
    try {
      const sudahAda = penilaian.some(
        (p) =>
          p.karyawanId === Number(id) &&
          p.bulan === selectedMonth &&
          p.tahun === selectedYear
      );

      if (sudahAda) {
        toast.error(
          `Penilaian ${selectedMonth} ${selectedYear} sudah dibuat untuk karyawan ini`
        );
        return;
      }

      await handleCreatePenilaian({
        karyawanId: Number(id),
        bulan: selectedMonth,
        tahun: Number(selectedYear),
        dibuatOlehId: userLogin.id,
      });

      toast.success("Penilaian berhasil dibuat");
    } catch (err) {
      console.error("Gagal submit:", err);
      toast.error("Gagal menyimpan penilaian");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nilaiReal =
        (matriks.find((m) => m.id === Number(form.matriksId)).bobot *
          Number(form.nilai)) /
        100; //mengkonfersi nilai input menjadi sesuai dengan bobot matrik

      const existingDetail = detail.find(
        (d) => d.matriksId === Number(form.matriksId)
      ); // cek jika detail penilaian ada .. jika ada akan di update jika tidak akan buat
      if (existingDetail) {
        await handleUpdateDetail(existingDetail.id, {
          nilai: nilaiReal,
        });
      } else {
        await handleCreateDetail({
          penilaianId: Number(penilaianId),
          matriksId: Number(form.matriksId),
          nilai: nilaiReal,
        });
      }
      await handleUpdatePenilaian(penilaianId, {
        karyawanId: Number(karyawanId), // berfungi untuk me refres totalSkor karena jika update akan otomatis akan menjumlah semua nilai skor
      });
      toast.success("Penilaian berhasil disimpan ");
      setForm({ matriksId: "", nilai: "" });
    } catch (err) {
      console.error("Gagal submit:", err);
      toast.error("Gagal menyimpan penilaian ", err.errors);
    }
  };

  return (
    <div className="w-full p-1 sm:p-1 md:p-1 lg:p-1 h-auto flex flex-col items-start gap-3">
      <div className="flex gap-3 items-center mb-4">
        <label className="font-medium">Pilih Bulan:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <label className="font-medium">Tahun:</label>
        <input
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        ></input>
      </div>

      {divisiLeader?.map((d) => {
        const penilaianAktif = d.penilaian.find(
          (p) => p.bulan === selectedMonth && p.tahun === selectedYear
        );

        return (
          <div
            className={`w-full flex gap-1 relative bg-white rounded-2xl shadow p-3 ${
              d?.penilaian.length >= 1
                ? "flex-col "
                : "justify-between items-center "
            }`}
            key={d.id}
          >
            <div className="w-full flex relative">
              <div className="w-auto text-2xl p-2 font-semibold">{d.nama}</div>
              <div className="w-auto text-sm flex items-center justify-center p-2 rounded-xl text-white bg-amber-400 absolute left-[20%] top-[15%] ">
                Total Skor:{" "}
                {penilaian.find((p) => p.id === penilaianAktif?.id)
                  ?.totalSkor || 0}
              </div>
              {d?.penilaian.length >= 1 && (
                <div
                  className="w-auto text-sm flex items-center justify-center p-2 rounded-xl text-white bg-red-400 absolute left-[60%] sm:left-[40%] md:left-[34%] lg:left-[30%] top-[15%] cursor-pointer "
                  onClick={() =>
                    handleDeletePenilaian(
                      penilaian.find((p) => p.id === penilaianAktif?.id)?.id
                    )
                  }
                >
                  <Trash2 size={20} />
                </div>
              )}
              {d?.penilaian.length >= 1 && (
                <div
                  onClick={() => toggleDropdown(d.id)}
                  className="w-10 aspect-square absolute right-1 p-2 top-[20%] cursor-pointer "
                >
                  <ChevronsDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      openDropdown[d.id] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              )}
            </div>
            <div
              className={`h-1 rounded-2xl transition-all duration-700 
              ${
                openDropdown[d.id]
                  ? "bg-blue-500 w-[100%] sm:w-[100%] md:w-[15%] lg:w-[11%]"
                  : "bg-gray-400 w-[2%]"
              }`}
            />
            {d.penilaian?.filter(
              (p) => p.bulan === selectedMonth && p.tahun === selectedYear
            ) &&
              matriks
                .filter(
                  (m) =>
                    m.karyawanId === d.id &&
                    m.bulan === selectedMonth &&
                    m.tahun === selectedYear
                )
                .map(
                  (m) =>
                    openDropdown[d.id] && (
                      <div
                        key={m.id}
                        className={`w-full flex items-start pb-5 flex-col sm:flex-col md:flex-row lg:flex-row gap-2 relative md:items-center lg:items-center overflow-hidden transition-all duration-1000
                      ${
                        openDropdown[d.id]
                          ? "max-h-96 opacity-100"
                          : "max-h-1 opacity-0"
                      }
                      `}
                      >
                        <div className="flex flex-col items-start p-2 gap-2 w-1/10 ">
                          <p className="font-semibold text-xl ">{m.namaKPI}</p>
                        </div>
                        <div className="w-full text-lg p-2 sm:p-0 md:p-0 lg:p-0 sm:w-full md:w-1/8 lg:w-1/10  h-full">
                          <p>{m.deskripsi}</p>
                        </div>
                        <div className="flex items-center justify-between w-[100%] sm:w-[90%] md:w-[30%] lg:w-[23%] gap-2">
                          <p className="w-auto sm:w-1/4 md:w-[50%] lg:w-[50%] flex text-[1rem] items-center justify-center p-3 bg-amber-400 h-1/2 text-white font-semibold rounded-2xl">
                            Weight: {m.bobot}%
                          </p>
                          <div className="w-auto sm:w-1/4 md:w-[50%] lg:w-[50%] flex text-[1rem] items-center justify-center p-3 bg-green-600 h-1/2 text-white font-semibold rounded-2xl">
                            <p>
                              Score:{" "}
                              {detail.find((d) => d.matriksId === m.id)
                                ?.nilai ?? "-"}
                            </p>
                          </div>
                        </div>
                        {!updateMatrik[m.id] && (
                          <form
                            className="absolute h-9 flex right-4 bottom-10 sm:bottom-2 md:bottom-[20%] lg:bottom-[20%] sm:right-5 md:right-4 lg:right-5 top-[85%] sm:top-[90%] md:top-[25%] lg:top-[5%] "
                            onSubmit={(e) => {
                              e.preventDefault();
                              setForm((prev) => ({
                                ...prev,
                                matriksId: m.id,
                                karyawanId: m.karyawanId,
                              }));
                              handleSubmit(e);
                            }}
                          >
                            <input
                              type="text"
                              className=" bg-transparent focus:outline-none"
                              value={form.matriksId === m.id ? form.nilai : ""}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  nilai: e.target.value,
                                  matriksId: m.id,
                                })
                              }
                              placeholder="Masukkan Nilai"
                            />
                            <div
                              className={`h-1 rounded-2xl transition-all duration-1000  absolute bottom-1 sm:bottom-0 md:-bottom-1 lg:-bottom-1
                          ${
                            m.id === form.matriksId && form.nilai
                              ? "bg-blue-500 w-[20%] right-0"
                              : "bg-gray-400 w-[100%]"
                          }`}
                            />
                            <button
                              type="submit"
                              onClick={() => {
                                setKaryawanId(d.id),
                                  setPenilaianId(
                                    penilaian.find(
                                      (p) => p.id === penilaianAktif?.id
                                    )?.id
                                  );
                              }}
                            >
                              Simpan
                            </button>
                          </form>
                        )}
                        <div
                          onClick={() => toggleDropdownUpdate(m.id, m)}
                          className="w-[10%] sm:w-[10%] md:w-[5%] lg:w-[5%] text-white text-[1rem] font-medium h-auto rounded-2xl items-center flex justify-center "
                        >
                          <Settings2 size={20} color="black" />
                        </div>

                        {updateMatrik[m.id] && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteMatrik(
                                  detail.find((d) => d.matriksId === m.id)?.id,
                                  m.id
                                )
                              }
                              className="w-auto aspect-square text-[1rem] font-medium h-auto bg-red-500 rounded-2xl p-2 items-center flex justify-center "
                            >
                              <Trash size={20} color="white" />
                            </button>

                            <form
                              onSubmit={handleUpdateMatrikSubmit}
                              className="flex gap-1 items-start h-auto sm:items-start md:items-center lg:items-center "
                            >
                              {/* Points */}
                              <div className="w-auto h-auto sm:w-full md:w-1/4 lg:w-1/4 group">
                                <label className="block mb-1 font-medium">
                                  Points
                                </label>
                                <select
                                  value={
                                    formMatrik.matrikId === m.id
                                      ? formMatrik.bobot
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setFormMatrik({
                                      ...formMatrik,
                                      bobot: e.target.value,
                                    })
                                  }
                                  className="w-full bg-transparent px-1 py-1 focus:outline-none"
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
                              </div>

                              {/* Task */}
                              <div className="w-auto h-auto sm:w-full md:w-1/4 lg:w-1/4 group">
                                <label className="block mb-1 font-medium">
                                  Task
                                </label>
                                <input
                                  value={
                                    formMatrik.matrikId === m.id
                                      ? formMatrik.namaKPI
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setFormMatrik({
                                      ...formMatrik,
                                      namaKPI: e.target.value,
                                    })
                                  }
                                  className="w-full bg-transparent px-1 py-1 focus:outline-none resize-none"
                                  placeholder="Enter name KPI"
                                  required
                                />
                              </div>

                              {/* Deskripsi */}
                              <div className="w-auto h-[30%] sm:w-full md:w-1/3 lg:w-1/3 group">
                                <label className="block mb-1 font-medium">
                                  Description
                                </label>
                                <input
                                  value={
                                    formMatrik.matrikId === m.id
                                      ? formMatrik.deskripsi
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setFormMatrik({
                                      ...formMatrik,
                                      deskripsi: e.target.value,
                                    })
                                  }
                                  className="w-full bg-transparent px-1 py-1 focus:outline-none resize-none"
                                  placeholder="Enter task description"
                                  required
                                />
                              </div>

                              <button
                                type="submit"
                                className="absolute right-5 top-[63%] underline-offset-6 underline sm:top-[80%] md:top-[20%] lg:top-[20%]"
                                onClick={() => setKaryawanId(d.id)}
                              >
                                Simpan
                              </button>
                            </form>
                          </>
                        )}

                        <div
                          className={`h-1 rounded-2xl transition-all duration-1000 absolute hidden md:block md:bottom-1 lg:bottom-1

                   ${
                     m.id === form.matriksId && form.nilai
                       ? "bg-blue-500 w-[94%]"
                       : "bg-gray-400 w-[5%]"
                   }`}
                        />
                      </div>
                    )
                )}
            {d.penilaian?.find(
              (p) => p.bulan === selectedMonth && p.tahun === selectedYear
            ) ? (
              <div></div>
            ) : (
              <div
                className="px-4 py-2 font-semibold bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
                onClick={() => {
                  setKaryawanId(d.id);
                  handleCreate(d.id);
                }}
              >
                buat penilaian
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
