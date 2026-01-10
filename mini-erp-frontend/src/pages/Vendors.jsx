import { useEffect, useState } from "react";
import { getVendors } from "../services/vendors.service";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendors().then(setVendors);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Vendors</h2>

      <div className="grid grid-cols-3 gap-4">
        {vendors.map(v => (
          <div key={v.vendor_id} className="p-4 shadow rounded">
            <h3 className="font-bold">{v.name}</h3>
            <p>{v.contact}</p>
            <p>{v.email}</p>
            <p>{v.phone}</p>
          </div>
        ))}
      </div>
    </>
  );
}
