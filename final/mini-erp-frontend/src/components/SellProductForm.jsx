import { useState } from "react";

export default function SellProductForm({ product, onSell, onCancel }) {
  const [qty, setQty] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(product.price);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSell({
      product_id: product.id,
      quantity: Number(qty),
      selling_price: Number(sellingPrice),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p>Selling: <b>{product.name}</b></p>
      <p>Current Stock: {product.stock}</p>
      <p>Sale Stock: </p>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        min="1"
        className="w-full border p-2"
        placeholder="Quantity"
        required
      />
      <p>Selling Price: </p>
      <input
        type="number"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(e.target.value)}
        min="0"
        step="0.01"
        className="w-full border p-2"
        placeholder="Selling Price"
        required
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Sell
        </button>
      </div>
    </form>
  );
}
