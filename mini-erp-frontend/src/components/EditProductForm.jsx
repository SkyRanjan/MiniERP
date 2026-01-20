import { useState } from "react";

export default function EditProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({ ...product });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="sku" value={form.sku} onChange={handleChange} className="w-full border p-2" />
      <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2" />
      <input name="vendor" value={form.vendor} onChange={handleChange} className="w-full border p-2" />
      <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border p-2" />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} className="w-full border p-2" />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </form>
  );
}
