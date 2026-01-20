import api from "../api/axios";

export const getPurchases = async () => {
  const res = await api.get("/reportl/low-stock");
  return res.data;
};
export const getLowStock = async () => {
  const res = await api.get("/reportl/low-stock");
  return res.data;
};

export const getSales = async () => {
  const res = await api.get("/sale");
  return res.data;
};
