import { productsMock } from "../mocks/products.mock";

export const getProducts = async () => {
  return productsMock; // mock for now
};
// replace only this file
// import api from "../api/axios";

// export const getProducts = async () => {
//   const res = await api.get("/products");
//   return res.data;
// };
