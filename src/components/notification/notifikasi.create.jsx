import { useAuthUser } from "../../utils/authUser"; 
import { useNotifikasiContext } from "../../store/notifikasi.context";




export function NotifikasiCreate() {

     const { userLogin, loading, error } = useAuthUser();
     const { handleCreate } = useNotifikasiContext();

    const notifikasiCreate = (judul, pesan) => {
        if (!loading && userLogin) {
            handleCreate({
                    userId: userLogin.id,
                    judul: judul,
                    pesan: pesan,
                    tipe: "in_app",
                    status: "terkirim"
                    });
        }
    };

    return { notifikasiCreate };
  
};