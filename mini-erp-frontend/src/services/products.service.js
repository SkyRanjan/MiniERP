// import { productsMock } from "../mocks/products.mock";

// export const getProducts = async () => {
//   return productsMock; // mock for now
// };
// export const addProduct = async (product) => {
//   productsMock.push({ //await api.post("/products", product)
//     ...product,
//     product_id: Date.now(),
//     status: product.stock < 10 ? "LOW_STOCK" : "IN_STOCK",
//   });
// };
// replace only this file
// import api from "../api/axios";

// export const getProducts = async () => {
//   const res = await api.get("/products");
//   return res.data;
// };
import api from "../api/axios";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const addProduct = async (product) => {
  const params = new URLSearchParams({
    name: product.name,
    price: product.price,
    vendor_id: product.vendor_id,
  });

  return await api.post(`/products?${params.toString()}`);
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

// export const updateStock = async (id, stock) => {
//   await api.post("/purchase", { product_id: id, quantity: stock });
// };
// export const updateStock = async (product_id, quantity) => {
//   const params = new URLSearchParams({
//     product_id,
//     quantity,
//   });

//   await api.post(`/purchase?${params.toString()}`);
// };
export const purchaseProduct = async (product_id, vendor_id, quantity) => {
  const params = new URLSearchParams({
    product_id,
    vendor_id,
    quantity,
  });

  return await api.post(`/purchase?${params.toString()}`);
};

export const getInventory = async () => {
  const res = await api.get("/inventory");
  return res.data;
};

export const sellProduct = async (product_id, quantity) => {
  const params = new URLSearchParams({
    product_id,
    quantity,
  });

  return await api.post(`/sale?${params.toString()}`);
};


