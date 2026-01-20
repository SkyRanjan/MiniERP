import { useState } from "react";

export default function EditVendorForm({ vendor, onSave, onCancel }) {
  const [form, setForm] = useState({ ...vendor });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-4"
    >
      <input
        name="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="border p-2 w-full"
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Save
        </button>
      </div>
    </form>
  );
}
