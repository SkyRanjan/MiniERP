// import { useEffect, useState } from "react";
// import { getProducts } from "../services/products.service";

// export default function Inventory() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts().then(setProducts);
//   }, []);

//   return (
//     <table className="w-full border">
//       <thead>
//         <tr>
//           <th>SKU</th>
//           <th>Name</th>
//           <th>Vendor</th>
//           <th>Price</th>
//           <th>Stock</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map(p => (
//           <tr key={p.product_id}>
//             <td>{p.sku}</td>
//             <td>{p.name}</td>
//             <td>{p.vendor}</td>
//             <td>${p.price}</td>
//             <td>{p.stock}</td>
//             <td className={p.status === "LOW_STOCK" ? "text-red-500" : "text-green-500"}>
//               {p.status}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

import { useEffect, useState } from "react";
import { getProducts } from "../services/products.service";
import Table from "../components/Table";

export default function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>

      <Table headers={["SKU", "Name", "Vendor", "Price", "Stock", "Status"]}>
        {products.map(p => (
          <tr key={p.product_id} className="text-center border-t">
            <td>{p.sku}</td>
            <td>{p.name}</td>
            <td>{p.vendor}</td>
            <td>${p.price}</td>
            <td>{p.stock}</td>
            <td className={p.status === "LOW_STOCK" ? "text-red-500" : "text-green-600"}>
              {p.status}
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}

