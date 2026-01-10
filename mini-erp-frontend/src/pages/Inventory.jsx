// import { useEffect, useState } from "react";
// import { getProducts } from "../services/products.service";

// export default function Inventory() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts().then(setProducts);
//   }, []);

//   return (
//     <table className="w-full border">
//       <thead>
//         <tr>
//           <th>SKU</th>
//           <th>Name</th>
//           <th>Vendor</th>
//           <th>Price</th>
//           <th>Stock</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map(p => (
//           <tr key={p.product_id}>
//             <td>{p.sku}</td>
//             <td>{p.name}</td>
//             <td>{p.vendor}</td>
//             <td>${p.price}</td>
//             <td>{p.stock}</td>
//             <td className={p.status === "LOW_STOCK" ? "text-red-500" : "text-green-500"}>
//               {p.status}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

import { useEffect, useState } from "react";
// import { getProducts } from "../services/products.service";
import Table from "../components/Table";
import { useAuth } from "../context/AuthContext";
import { canAddProduct, canUpdateStock } from "../utils/permissions";
import Modal from "../components/Modal";
import AddProductForm from "../components/AddProductForm";
import { addProduct, getProducts } from "../services/products.service";
import UpdateStockForm from "../components/UpdateStockForm";
import EditProductForm from "../components/EditProductForm";
import { ROLES } from "../constants/roles";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      {canAddProduct(user.role) && (
          <button
            onClick={() => setShowModal(true)}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        )}
      
      {showModal && (
        <Modal title="Add Product" onClose={() => setShowModal(false)}>
          <AddProductForm
            onSave={async (product) => {
              await addProduct(product);
              setProducts(await getProducts());
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
      {showStockModal && selectedProduct && (
        <Modal title="Update Stock" onClose={() => setShowStockModal(false)}>
          <UpdateStockForm
            product={selectedProduct}
            onSave={(newStock) => {
                setProducts((prev) => //await api.put(`/products/${id}/stock`, { stock: newStock });
                  prev.map((p) =>
                    p.product_id === selectedProduct.product_id
                      ? {
                          ...p,
                          stock: newStock,
                          status: newStock < 10 ? "LOW_STOCK" : "IN_STOCK",
                        }
                      : p
                  )
                );
                setShowStockModal(false);
              }}
              onCancel={() => setShowStockModal(false)}
            />
          </Modal>
        )}
      {editProduct && (
          <Modal title="Edit Product" onClose={() => setEditProduct(null)}>
            <EditProductForm
              product={editProduct}
              onSave={(updated) => {
                setProducts(prev =>
                  prev.map(p =>
                    p.product_id === updated.product_id
                      ? {
                          ...updated,
                          status: updated.stock < 10 ? "LOW_STOCK" : "IN_STOCK",
                        }
                      : p
                  )
                );
                setEditProduct(null);
              }}
              onCancel={() => setEditProduct(null)}
            />
          </Modal>
        )}

      <Table headers={["SKU", "Name", "Vendor", "Price", "Stock", "Status", "Actions"]}>
        {products.map(p => (
          <tr key={p.product_id} className="text-center border-t">
            <td>{p.sku}</td>
            <td>{p.name}</td>
            <td>{p.vendor}</td>
            <td>${p.price}</td>
            <td>{p.stock}</td>
            <td className={p.status === "LOW_STOCK" ? "text-red-500" : "text-green-600"}>
              {p.status}
            </td>
            <td>
              {canUpdateStock(user.role) && (
                <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowStockModal(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Update Stock
                </button>
              )}
            </td>
              <td className="space-x-2">
                {user.role === ROLES.ADMIN && (
                  <>
                    <button
                      onClick={() => setEditProduct(p)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        setProducts(prev => prev.filter(x => x.product_id !== p.product_id))
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>

          </tr>
        ))}
      </Table>
    </>
  );
}



