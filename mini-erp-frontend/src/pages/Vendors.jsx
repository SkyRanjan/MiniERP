import { useEffect, useState } from "react";
// import { getVendors } from "../services/vendors.service";
import { useAuth } from "../context/AuthContext";
import { canAddVendor } from "../utils/permissions";
import Modal from "../components/Modal";
import AddVendorForm from "../components/AddVendorForm";
import { getVendors, addVendor } from "../services/vendors.service";
import { ROLES } from "../constants/roles";
import EditVendorForm from "../components/EditVendorForm";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editVendor, setEditVendor] = useState(null);

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
      {editVendor && (
          <Modal title="Edit Vendor" onClose={() => setEditVendor(null)}>
            <EditVendorForm
              vendor={editVendor}
              onSave={(updated) => {
                setVendors(prev =>
                  prev.map(v =>
                    v.vendor_id === updated.vendor_id ? updated : v
                  )
                );
                setEditVendor(null);
              }}
              onCancel={() => setEditVendor(null)}
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
            {user.role === ROLES.ADMIN && (
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setEditVendor(v)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  setVendors(prev => prev.filter(x => x.vendor_id !== v.vendor_id))
                }
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}

          </div>
        ))}
      </div>
    </>
  );
}
