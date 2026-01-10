// const Dashboard = () => {
//   return (
//     <h1 className="text-2xl font-bold">Dashboard</h1>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboard.service";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-4xl text-red-500 font-bold">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Inventory" value={data.total_inventory} />
        <StatCard title="Total Value" value={`$${data.total_value}`} />
        <StatCard title="Low Stock Alerts" value={data.low_stock_count} danger />
      </div>
    </>
  );
}
