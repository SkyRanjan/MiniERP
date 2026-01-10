import { useState } from "react";

export default function AddProductForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    sku: "",
    name: "",
    vendor: "",
    price: "",
    stock: "",
  });

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
      <input name="sku" placeholder="SKU" onChange={handleChange} className="w-full border p-2" required />
      <input name="name" placeholder="Product Name" onChange={handleChange} className="w-full border p-2" required />
      <input name="vendor" placeholder="Vendor" onChange={handleChange} className="w-full border p-2" required />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full border p-2" required />
      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="w-full border p-2" required />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
}
