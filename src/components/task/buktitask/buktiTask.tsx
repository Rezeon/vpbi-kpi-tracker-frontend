import React, { useState, useContext } from "react";
import Button from "../../ui/button/Button";
import { BuktiContext } from "../../../store/createcontext/divisi.context";
import { useAuthUser } from "../../../utils/authUser";
import toast from "react-hot-toast";

interface Karyawan {
  id: number;
  nama?: string;
}

interface UserLogin {
  id: number;
  email: string;
  role?: "admin" | "leader" | "user";
  karyawan?: Karyawan;
}

interface FormBuktiKPIProps {
  matriksId: number | null;
  karyawanId: number | null;
  bulan: string | null;
  onClose: () => void;
}

export default function FormBuktiKPI({ matriksId, onClose }: FormBuktiKPIProps) {
  const { handleCreate } = useContext(BuktiContext);
  const date = new Date();
  const monthName = date.toLocaleString("id-ID", { month: "long" });
  const { userLogin } = useAuthUser() as {
    userLogin: UserLogin | null;
    loading: boolean
  };

  const [deskripsi, setDeskripsi] = useState<string>("");
  const [fileUrl, setLinkBukti] = useState<string>("");

  const isAdminOrLeader =
    userLogin?.role === "admin" || userLogin?.role === "leader";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matriksId || !userLogin?.karyawan?.id) {
      alert("Matriks atau Karyawan tidak valid");
      return;
    }

    try {
      const data = {
        matriksId,
        karyawanId: userLogin.karyawan.id,
        deskripsi,
        fileUrl,
        bulan: monthName //  kirim link saja
      };

      await handleCreate(data);
      toast.success("Berhasil mengirim bukti");
      onClose();
    } catch (err) {
      console.error("Gagal kirim bukti:", err);
      toast.error("Terjadi kesalahan saat mengirim bukti");
    }
  };

  //  Kalau admin/leader, cuma tampilkan bukti, tidak ada form
  if (isAdminOrLeader) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 space-y-4">
        <h3 className="font-semibold text-lg dark:text-white">Lihat Bukti KPI</h3>
        {/* nanti di sini bisa fetch dan render daftar bukti */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Admin/Leader hanya bisa melihat bukti KPI yang dikirim oleh karyawan.
        </p>
        <div className="flex justify-end">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    );
  }

  //  Kalau user biasa, tampilkan form kirim bukti
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 space-y-4"
    >
      <h3 className="font-semibold text-lg dark:text-white">Kirim Bukti KPI</h3>

      <textarea
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        placeholder="Deskripsi bukti..."
        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
      />

      <input
        type="text"
        value={fileUrl}
        onChange={(e) => setLinkBukti(e.target.value)}
        placeholder="Masukkan link bukti (Google Drive, URL, dsb)"
        className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" size="md" onClick={onClose}>
          Batal
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!matriksId || !fileUrl}
        >
          Kirim
        </Button>
      </div>
    </form>
  );
}
