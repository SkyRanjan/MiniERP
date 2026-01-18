// import { vendorsMock } from "../mocks/vendors.mock";

// export const getVendors = async () => vendorsMock;

// export const addVendor = async (vendor) => {
//   vendorsMock.push({ //await api.post("/vendors", vendor)
//     ...vendor,
//     vendor_id: Date.now(),
//   });
// };
import api from "../api/axios";

export const getVendors = async () => {
  const res = await api.get("/vendors");
  return res.data;
};

// export const addVendor = async (vendor) => {
//   const res = await api.post("/vendors", vendor);
//   return res.data;
// };

export const addVendor = async (vendor) => {
  const params = new URLSearchParams({
    name: vendor.name,
    phone: vendor.phone,
  });

  return await api.post(`/vendors?${params.toString()}`);
};

export const deleteVendor = async (id) => {
  await api.delete(`/vendors/${id}`);
};


// export const updateVendor = async (id, name, phone) => {
//   const params = new URLSearchParams({ name, phone });
//   await api.post(`/vendors/${id}?${params.toString()}`);
// };
