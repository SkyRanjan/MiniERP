import api from "../api/axios";

/* =======================
   PRODUCTS
======================= */

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const addProduct = async (product) => {
  // Backend expects JSON body
  // { name, price, vendor_id }
  const res = await api.post("/products", {
    name: product.name,
    price: product.price,
    vendor_id: product.vendor_id,
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

/* =======================
   INVENTORY / PURCHASE
======================= */

export const purchaseProduct = async (product_id, vendor_id, quantity) => {
  // Backend expects JSON body
  const res = await api.post("/purchase", {
    product_id,
    vendor_id,
    quantity,
  });
  return res.data;
};

export const getInventory = async () => {
  const res = await api.get("/inventory");
  return res.data;
};

/* =======================
   SALES
======================= */

// import api from "./axios";

export const sellProduct = (payload) => {
  return api.post("/sale", payload);
};

