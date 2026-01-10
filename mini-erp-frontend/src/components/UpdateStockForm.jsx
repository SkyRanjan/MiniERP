import { useState } from "react";

export default function UpdateStockForm({ product, onSave, onCancel }) {
  const [stock, setStock] = useState(product.stock);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(Number(stock));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Product</label>
        <p className="font-semibold">{product.name}</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Current Stock</label>
        <p>{product.stock}</p>
      </div>

      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full border p-2"
        required
        min="0"
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
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Update Stock
        </button>
      </div>
    </form>
  );
}
