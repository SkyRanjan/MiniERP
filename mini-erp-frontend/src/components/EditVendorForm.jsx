import { useState } from "react";

export default function EditVendorForm({ vendor, onSave, onCancel }) {
  const [form, setForm] = useState({ ...vendor });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2" />
      <input name="contact" value={form.contact} onChange={handleChange} className="w-full border p-2" />
      <input name="email" value={form.email} onChange={handleChange} className="w-full border p-2" />
      <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2" />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </form>
  );
}
