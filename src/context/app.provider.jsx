import { KaryawanProvider } from "../store/karyawan.context";
import { DetailProvider } from "../store/detail.context";
import { DivisiProvider } from "../store/divisi.context";
import { LaporanProvider } from "../store/laporan.context";
import { MatrikProvider } from "../store/matrik.context";
import { NotifikasiProvider } from "../store/notifikasi.context";
import { PenilaianProvider } from "../store/penilaian.context";
import { UserProvider } from "../store/user.context";

export function AppProviders({ children }) {
  return (
    <UserProvider>
      <PenilaianProvider>
        <DivisiProvider>
          <KaryawanProvider>
            <DetailProvider>
              <MatrikProvider>
                <NotifikasiProvider>
                  <LaporanProvider>{children}</LaporanProvider>
                </NotifikasiProvider>
              </MatrikProvider>
            </DetailProvider>
          </KaryawanProvider>
        </DivisiProvider>
      </PenilaianProvider>
    </UserProvider>
  );
}
