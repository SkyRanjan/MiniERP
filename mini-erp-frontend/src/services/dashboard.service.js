// import { dashboardMock } from "../mocks/dashboard.mock";

// export const getDashboardSummary = async () => {
//   return dashboardMock;
// };
import api from "../api/axios";

export const getDashboardSummary = async () => {
  const res = await api.get("/report/low-stock");
  return {
    total_inventory: 0,  // compute later
    total_value: 0,
    low_stock_count: res.data.length,
  };
};
