import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.VITE_API_URL;

export const useBuktiKpiService = () => {
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
      return axios.get(`${api_vpbi}/buktiKpi/api/all`, await authHeaders());
    },
    getById: async (id) => {
      return axios.get(`${api_vpbi}/buktiKpi/api/${id}`, await authHeaders());
    },
    create: async (data) => {
      return axios.post(`${api_vpbi}/buktiKpi/api/add`, data, await authHeaders());
    },
    update: async (id, data) => {
      return axios.patch(`${api_vpbi}/buktiKpi/api/update/${id}`, data, await authHeaders());
    },
    remove: async (id) => {
      return axios.delete(`${api_vpbi}/buktiKpi/api/delete/${id}`, await authHeaders());
    },
  };
};
