import { ROLES } from "../constants/roles";

export const canAddProduct = (role) => role === ROLES.ADMIN;
export const canAddVendor = (role) => role === ROLES.ADMIN;
