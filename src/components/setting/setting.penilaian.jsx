import { useContext, useState } from "react";
import {
  DetailContext,
  PenilaianContext,
} from "../../store/createcontext/divisi.context";
import toast from "react-hot-toast";

export function SettingPenilaian({ matrik, userLogin }) {
  const date = new Date();
  const monthName = date.toLocaleString("id-ID", { month: "long" });

  const {
    handleCreate: handleCreatePenilaian,
    handleUpdate: handleUpdatePenilaian,
    penilaian,
  } = useContext(PenilaianContext);

  const {
    handleCreate: handleCreateDetail,
    handleUpdate: handleUpdateDetail,
    detail,
  } = useContext(DetailContext);
  console.log(penilaian, detail);

  const [karyawanId, setKaryawanId] = useState(null);

  const [form, setForm] = useState({
    matriksId: "",
    nilai: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingPenilaian = (penilaian).find(
        (p) => p.karyawanId === karyawanId && p.bulan === monthName
      );

      let penilaianId;

      if (existingPenilaian) {
        penilaianId = existingPenilaian.id;
        await handleUpdatePenilaian(existingPenilaian.id, {
          totalSkor: Number(existingPenilaian.totalSkor) + Number(form.nilai),
        });
      } else {
        const newPenilaian = await handleCreatePenilaian({
          karyawanId: karyawanId,
          bulan: monthName,
          totalSkor: Number(form.nilai),
          dibuatOlehId: userLogin.id,
        });
        penilaianId = newPenilaian.id;
      }

      const existingDetail = (detail).find(
        (d) => d.penilaianId === penilaianId && d.matriksId === form.matriksId
      );

      if (existingDetail) {
        await handleUpdateDetail(existingDetail.id, {
          nilai: form.nilai,
        });
      } else {
        await handleCreateDetail({
          penilaianId,
          matriksId: form.matriksId,
          nilai: form.nilai,
        });
      }

      toast.success("Penilaian berhasil disimpan ");
      setForm({ matriksId: "", nilai: "" });
    } catch (err) {
      console.error("Gagal submit:", err);
      toast.error("Gagal menyimpan penilaian ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={form.matriksId}
        onChange={(e) => setForm({ ...form, matriksId: e.target.value })}
      >
        <option value="">Pilih Matriks</option>
        {matrik.map((m) => (
          <option key={m.id} value={m.id}>
            {m.namaKPI}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={form.nilai}
        onChange={(e) => setForm({ ...form, nilai: e.target.value })}
        placeholder="Masukkan Nilai"
      />

      <button type="submit" onClick={setKaryawanId(matrik.karyawanId)}>
        Simpan
      </button>
    </form>
  );
}
