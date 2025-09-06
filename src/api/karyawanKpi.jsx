import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.VITE_API_URL;

export const useKaryawanKpi = () => {
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
      return axios.get(`${api_vpbi}/karyawan/api/all`, await authHeaders());
    },
    getById: async (id) => {
      return axios.get(`${api_vpbi}/karyawan/api/${id}`, await authHeaders());
    },
    create: async (data) => {
      return axios.post(
        `${api_vpbi}/karyawan/api/add`,
        data,
        await authHeaders(),
        console.log(data)
        
      );
    },
    update: async (data) => {
      return axios.patch(
        `${api_vpbi}/karyawan/api/update`,
        data,
        await authHeaders()
      );
    },
    remove: async (id) => {
      return axios.delete(
        `${api_vpbi}/karyawan/api/delete/${id}`,
        await authHeaders()
      );
    },
  };
};
