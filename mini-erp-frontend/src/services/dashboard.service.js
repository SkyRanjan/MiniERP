// import { dashboardMock } from "../mocks/dashboard.mock";

// export const getDashboardSummary = async () => {
//   return dashboardMock;
// };
// import api from "../api/axios";

// export const getDashboardSummary = async () => {
//   const res = await api.get("/report/low-stock");
//   return {
//     total_inventory: 0,  // compute later
//     total_value: 0,
//     low_stock_count: res.data.length,
//   };
// };
import api from "../api/axios";

export const initializeAccount = async (balance) => {
  return api.post("/account/initialize", null, {
    params: { initial_balance: balance },
  });
};

export const getBalance = async () => {
  const res = await api.get("/account/balance");
  return res.data;
};

export const getProfitLoss = async () => {
  const res = await api.get("/account/profit-loss");
  return res.data;
};
