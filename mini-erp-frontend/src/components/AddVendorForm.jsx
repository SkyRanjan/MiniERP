import { useState } from "react";

export default function AddVendorForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Vendor Name"
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <input
        name="contact"
        placeholder="Contact Person"
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="w-full border p-2"
        required
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
