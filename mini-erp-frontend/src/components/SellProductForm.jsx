import { useState } from "react";

export default function SellProductForm({ product, onSell, onCancel }) {
  const [qty, setQty] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSell(Number(qty));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p>Selling: <b>{product.name}</b></p>
      <p>Current Stock: {product.stock}</p>

      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="w-full border p-2"
        min="1"
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">
          Cancel
        </button>

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Sell
        </button>
      </div>
    </form>
  );
}
