import { useEffect, useState } from "react";
import { getReports } from "../services/reports.service";
import Table from "../components/Table";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then(setReports);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <Table headers={["Date", "Type", "Product", "Quantity"]}>
        {reports.map((r, i) => (
          <tr key={i} className="text-center border-t">
            <td>{r.date}</td>
            <td className={r.type === "SALE" ? "text-red-500" : "text-green-600"}>
              {r.type}
            </td>
            <td>{r.product}</td>
            <td>{r.quantity}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
