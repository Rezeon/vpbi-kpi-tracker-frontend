import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.API_URL;

export const useUserKpi = () => {
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
      return axios.get(`${api_vpbi}/laporanKpi/AllUser`, await authHeaders());
    },
    getById: async (data) => {
      return axios.get(`${api_vpbi}/laporanKpi/UserById`, data, await authHeaders());
    },
    create: async (data) => {
      return axios.post(`${api_vpbi}/laporanKpi/register`, data, await authHeaders());
    },
    update: async (data) => {
      return axios.patch(`${api_vpbi}/laporanKpi/update`, data, await authHeaders());
    },
    remove: async (data) => {
      return axios.delete(`${api_vpbi}/laporanKpi/delete/user`, data, await authHeaders());
    },
  };
};
