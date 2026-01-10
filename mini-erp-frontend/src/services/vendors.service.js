import { vendorsMock } from "../mocks/vendors.mock";

export const getVendors = async () => vendorsMock;

export const addVendor = async (vendor) => {
  vendorsMock.push({ //await api.post("/vendors", vendor)
    ...vendor,
    vendor_id: Date.now(),
  });
};