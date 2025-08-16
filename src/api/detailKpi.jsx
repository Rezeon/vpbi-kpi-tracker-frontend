import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.API_URL;

export const useDetailKpi = () => {
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
      return axios.get(`${api_vpbi}/detailPenilaian/api/all`, await authHeaders());
    },
    getById: async (id) => {
      return axios.get(`${api_vpbi}/detailPenilaian/api/${id}`, await authHeaders());
    },
    create: async (data) => {
      return axios.post(`${api_vpbi}/detailPenilaian/api/add`, data, await authHeaders());
    },
    update: async (data) => {
      return axios.patch(`${api_vpbi}/detailPenilaian/api/update`, data, await authHeaders());
    },
    remove: async (data) => {
      return axios.delete(`${api_vpbi}/detailPenilaian/api/delete`, data, await authHeaders());
    },
  };
};
