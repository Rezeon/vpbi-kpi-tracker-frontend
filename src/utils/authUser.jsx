import { useUser } from "@clerk/clerk-react";
import { useUserKpi } from "../api/userKpi";
import { useEffect, useState } from "react";

export const useAuthUser = () => {
  const { user } = useUser();
  const { getById } = useUserKpi();

  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getById(user.id)
        .then((res) => {
          if (!res.data) {
            setUserLogin({ role: "", email: "", username: "" }); 
          } else {
            setUserLogin(res.data);
          }
        })
        .catch((err) => setError(err.response.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return { userLogin, loading, user, error };
};
