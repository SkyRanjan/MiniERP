import { useEffect, useState } from "react";
import { initializeAccount, getBalance, getProfitLoss } from "../services/dashboard.service";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [profit, setProfit] = useState(null);
  const [initBalance, setInitBalance] = useState("");

  const loadData = async () => {
  try {
    const bal = await getBalance();
    setBalance(bal.balance || bal["current balance"]);

    const pl = await getProfitLoss();
    setProfit(pl["profit or loss"]);
  } catch (err) {
    console.log("Account not initialized yet");
    setBalance(null);
  }
};

  useEffect(() => {
    loadData();
  }, []);

  if (balance === null) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Initialize Account</h2>
        <input
          type="number"
          placeholder="Enter Opening Balance"
          value={initBalance}
          onChange={e => setInitBalance(e.target.value)}
          className="w-full border p-2 mb-3"
        />
        <button
          onClick={async () => {
            try {
              await initializeAccount(Number(initBalance));
              loadData();
            } catch (err) {
              alert(err.response?.data?.detail || "Initialization failed");
            }
          }}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Initialize
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Current Balance</h3>
        <p className="text-2xl font-bold text-green-600">₹ {balance}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Profit / Loss</h3>
        <p className={`text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
          ₹ {profit}
        </p>
      </div>
    </div>
  );
}
