import React, { useEffect, useState } from "react";
import {
  BuktiContext,
  MatriksContext,
} from "../../../store/createcontext/divisi.context";
import { useContext } from "react";
import Button from "../../ui/button/Button";

export default function ViewBuktiKPI({ matriksId, onClose }) {
  const { getById } = useContext(MatriksContext);
  const { handleDelete } = useContext(BuktiContext);
  const [bukti, setBukti] = useState([]);
  useEffect(() => {
    if (matriksId) {
      const fetchData = async () => {
        const data = await getById(matriksId);
        // Pastikan ambil langsung array bukti
        console.log("l", data.data);
        setBukti(data.data.BuktiKPI || []);
      };
      fetchData();
    }
  }, [matriksId]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 space-y-4">
      <h3 className="font-semibold text-lg dark:text-white">
        Daftar Bukti KPI
      </h3>

      {bukti.length === 0 ? (
        <p className="text-gray-500">Belum ada bukti untuk KPI ini</p>
      ) : (
        <ul className="list-disc list-inside flex flex-col gap-2">
          {bukti?.map((b) => (
            <li
              key={b.id}
              className="p-3 border rounded-lg shadow-sm bg-white space-y-2"
            >
              <a
                href={b.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                {b.deskripsi || "Bukti"}
              </a>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Status: <span className="font-semibold">{b.status}</span>
                </span>
                <span>
                  Bulan: <span className="font-semibold">{b.bulan}</span>
                </span>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={async () => {
                    try {
                      await handleDelete(b.id); // hapus dari backend
                      setBukti((prev) =>
                        prev.filter((item) => item.id !== b.id)
                      ); // update state lokal
                    } catch (err) {
                      console.error("Gagal menghapus bukti:", err);
                    }
                  }}
                >
                  Hapus
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-end">
        <Button type="button" variant="outline" size="md" onClick={onClose}>
          Tutup
        </Button>
      </div>
    </div>
  );
}
