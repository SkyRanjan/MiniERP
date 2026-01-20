import { getProducts } from "../services/products.service";
import { getVendors } from "../services/vendors.service";
import { useEffect, useState } from "react";
import { getPurchases, getSales, getLowStock} from "../services/reports.service";

export default function Reports() {
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  
//   useEffect(() => {
//   getVendors().then(data => {
//     console.log("VENDORS API RESPONSE:", data);
//     setVendors(data);
//   });
// }, []);

  useEffect(() => {
    getProducts().then(setProducts);
    getVendors().then(setVendors);
    getPurchases().then(setPurchases);
    getSales().then(setSales);
  }, []);

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold mb-3">Low Stock Reports</h2>

      <table className="w-full border rounded overflow-hidden shadow">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2 text-center border-r">Product</th>
            <th className="p-2 text-center border-r">Vendor</th>
            <th className="p-2 text-center border-r">Quantity</th>
            <th className="p-2 text-center border-r">Amount</th>
            <th className="p-2 text-center">Date</th>
          </tr>
        </thead>


        <tbody>
          {purchases.map(p => {
            const product = products.find(prod => prod.id === p.product_id);
            const vendor = vendors.find(v => v.id === product?.vendor_id);
            // console.log("PURCHASE:", p);

            return (
              <tr key={p.id} className="border-t text-center hover:bg-gray-50">
                <td className="p-2 border-r">{product?.name}</td>
                <td className="p-2 border-r">{vendor?.name}</td>
                <td className="p-2 border-r">{p.quantity}</td>
                <td className="p-2 border-r font-semibold text-green-600">
                  ₹ {(product?.price || 0) * p.quantity}
                </td>
                <td className="p-2 text-gray-500">{p.date || "-"}</td>
              </tr>
            );
          })}
        </tbody>

      </table>

      {/* <h2 className="text-2xl font-bold">Sales Reports</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity Sold</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s.id}>
              <td>{s.product_name}</td>
              <td>{s.quantity}</td>
              <td>{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

    </div>
  );
}

