import { useState } from "react";

export default function UpdateStockForm({ product, onSave, onCancel }) {
  const [stock, setStock] = useState(product.stock ?? 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(Number(stock));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p>Updating stock for <b>{product.name}</b></p>

      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full border p-2"
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">
          Cancel
        </button>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Stock
        </button>
      </div>
    </form>
  );
}
