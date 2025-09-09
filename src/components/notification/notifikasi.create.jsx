import { useAuthUser } from "../../utils/authUser"; 
import { useNotifikasiContext } from "../../store/notifikasi.context";
import { useUserKpi } from "../../api/userKpi";



export function NotifikasiCreate() {

     const { getAll } = useUserKpi();
     const { userLogin, loading  } = useAuthUser();
     const { handleCreate, setError } = useNotifikasiContext();

    const notifikasiCreate = (judul, pesan, untuk) => {
        if (!loading && userLogin && untuk === "sendiri") {
            handleCreate({
                    userId: userLogin.id,
                    judul: judul,
                    pesan: pesan,
                    tipe: "in_app",
                    status: "terkirim"
                    });
        }
        else if (!loading && userLogin && untuk === "semua") {

            const getAllUser = async () => {
                try {
                const res = await getAll();
                const resData = res.data;
                resData.forEach((item, index) => {
                    
                    handleCreate({
                    userId: resData[index].id,
                    judul: judul,
                    pesan: pesan,
                    tipe: "in_app",
                    status: "terkirim"
                    }, resData[index].id === userLogin.id);

                });
                }
                catch (err) {
                console.error("Gagal get all:", err);
                setError(err);
                }
            };

            getAllUser();
        }
    };

    return { notifikasiCreate };
  
};