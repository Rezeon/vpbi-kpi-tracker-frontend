import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.VITE_API_URL;

export const useMatriksKpi = () => {
  const { getToken } = useAuth();

  const authHeaders = async () => {
    const token = await getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  return {
    getAll: async () => {
      return axios.get(`${api_vpbi}/matriksKpi/api/all`, await authHeaders());
    },
    getById: async (id) => {
      return axios.get(`${api_vpbi}/matriksKpi/api/${id}`, await authHeaders());
    },
    create: async (data) => {
      return axios.post(`${api_vpbi}/matriksKpi/api/add`, data, await authHeaders());
    },
    update: async (id,data) => {
      return axios.patch(`${api_vpbi}/matriksKpi/api/update/${id}`, data, await authHeaders());
    },
    remove: async (id) => {
      return axios.delete(`${api_vpbi}/matriksKpi/api/delete/${id}`, await authHeaders());
    },
  };
};
