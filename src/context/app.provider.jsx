import { KaryawanProvider } from "../store/karyawan.context";
import { DetailProvider } from "../store/detail.context";
import { DivisiProvider } from "../store/divisi.context";
import { LaporanProvider } from "../store/laporan.context";
import { MatrikProvider } from "../store/matrik.context";
import { NotifikasiProvider } from "../store/notifikasi.context";
import { PenilaianProvider } from "../store/penilaian.context";
import { UserProvider } from "../store/user.context";
import { BuktiProvider } from "../store/buktikpi.context";

export function AppProviders({ children }) {
  return (
    <UserProvider>
      <PenilaianProvider>
        <DivisiProvider>
          <KaryawanProvider>
            <BuktiProvider>
              <DetailProvider>
                <MatrikProvider>
                  <NotifikasiProvider>
                    <LaporanProvider>{children}</LaporanProvider>
                  </NotifikasiProvider>
                </MatrikProvider>
              </DetailProvider>
            </BuktiProvider>
          </KaryawanProvider>
        </DivisiProvider>
      </PenilaianProvider>
    </UserProvider>
  );
}
