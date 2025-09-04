import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.VITE_API_URL;

export const useNotifikasi = () => {
  const { getToken } = useAuth();

  const authHeaders = async () => {
    const token = await getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  return {
    getById: async (userId) => {
      return axios.get(`${api_vpbi}/notifikasi/api/${userId}`, await authHeaders());
    },
    create: async (data) => {
      return axios.post(`${api_vpbi}/notifikasi/api/createNotifikasi`, data, await authHeaders());
    },
    update: async (id, data) => {
      return axios.patch(`${api_vpbi}/notifikasi/api/markAsRead/${id}`, data, await authHeaders());
    },
  };
};
