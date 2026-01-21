import api from "../api/axios";

export const addVendor = async (vendor) => {
  const res = await api.post("/vendors", vendor);
  return res.data;
};

export const getVendors = async () => {
  const res = await api.get("/vendors");
  return res.data;
};

export const deleteVendor = async (vendorId) => {
  const res = await api.delete(`/vendors/${vendorId}`);
  return res.data;
};

export const updateVendorPhone = async (vendorId, phone) => {
  const res = await api.patch(`/vendors/${vendorId}/phone`, {
    phone,
  });
  return res.data;
};
