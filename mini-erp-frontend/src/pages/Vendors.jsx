import { useEffect, useState } from "react";
// import { getVendors } from "../services/vendors.service";
import { useAuth } from "../context/AuthContext";
import { canAddVendor } from "../utils/permissions";
import Modal from "../components/Modal";
import AddVendorForm from "../components/AddVendorForm";
import { getVendors, addVendor } from "../services/vendors.service";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getVendors().then(setVendors);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Vendors</h2>
      {canAddVendor(user.role) && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Vendor
        </button>
      )}
      {showModal && (
        <Modal title="Add Vendor" onClose={() => setShowModal(false)}>
          <AddVendorForm
            onSave={async (vendor) => {
              await addVendor(vendor);
              setVendors(await getVendors());
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}

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
