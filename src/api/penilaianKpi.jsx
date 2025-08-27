import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.VITE_API_URL;

export const usePenilaian = () => {
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
    getAll: async () => {
      return axios.get(`${api_vpbi}/penilaianKpi/api/all`, await authHeaders());
    },
    getById: async (id) => {
      return axios.get(`${api_vpbi}/penilaianKpi/api/${id}`, await authHeaders());
    },
    create: async (data) => {
      return axios.post(`${api_vpbi}/penilaianKpi/api/add`, data, await authHeaders());
    },
    update: async (data) => {
      return axios.patch(`${api_vpbi}/penilaianKpi/api/update`, data, await authHeaders());
    },
    remove: async (data) => {
      return axios.delete(`${api_vpbi}/penilaianKpi/api/delete`, data, await authHeaders());
    },
  };
};
