import { productsMock } from "../mocks/products.mock";

export const getProducts = async () => {
  return productsMock; // mock for now
};
export const addProduct = async (product) => {
  productsMock.push({ //await api.post("/products", product)
    ...product,
    product_id: Date.now(),
    status: product.stock < 10 ? "LOW_STOCK" : "IN_STOCK",
  });
};
// replace only this file
// import api from "../api/axios";

// export const getProducts = async () => {
//   const res = await api.get("/products");
//   return res.data;
// };
