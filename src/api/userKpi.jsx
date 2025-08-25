import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const api_vpbi = import.meta.env.VITE_API_URL;

export const useUserKpi = () => {
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
      return axios.get(`${api_vpbi}/user/api/AllUser`, await authHeaders());
    },
    getById: async (id) => {
      return axios.get(`${api_vpbi}/user/api/${id}`, await authHeaders());
    },
    create: async (data) => {
      return axios.post(`${api_vpbi}/user/api/register`, data, await authHeaders());
    },
    update: async (data) => {
      return axios.patch(`${api_vpbi}/user/api/update`, data, await authHeaders());
    },
    remove: async (data) => {
      return axios.delete(`${api_vpbi}/user/api/delete/user`, data, await authHeaders());
    },
  };
};
