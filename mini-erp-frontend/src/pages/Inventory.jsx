import { useEffect, useState } from "react";

import Table from "../components/Table";
import { useAuth } from "../context/AuthContext";
import { canAddProduct, canUpdateStock } from "../utils/permissions";
import Modal from "../components/Modal";
import AddProductForm from "../components/AddProductForm";

import UpdateStockForm from "../components/UpdateStockForm";
import EditProductForm from "../components/EditProductForm";
import { ROLES } from "../constants/roles";

import { getProducts, addProduct, purchaseProduct, getInventory, sellProduct, deleteProduct } from "../services/products.service";
import SellProductForm from "../components/SellProductForm";
import { getVendors } from "../services/vendors.service";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showSellModal, setShowSellModal] = useState(false);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
  async function loadData() {
    getProducts().then(setProducts);
    getVendors().then(setVendors);
    const productList = await getProducts();
    const inventoryList = await getInventory();
    
    const merged = productList.map(p => {
      const inv = inventoryList.find(i => i.product_id === p.id);
      return {
        ...p,
        stock: inv ? inv.quantity : 0,
        status: (inv ? inv.quantity : 0) < 10 ? "LOW_STOCK" : "IN_STOCK",
      };
    });

    setProducts(merged);
  }

  loadData();
}, []);

  <button
  onClick={async () => {
    await deleteProduct(p.product_id);
    setProducts(await getProducts());
  }}
  className="text-red-600"
>
  Delete
</button>


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
            onSave={async (newStock) => {
              const qtyToAdd = newStock - selectedProduct.stock;

              if (qtyToAdd > 0) {
                console.log("Calling purchase API", {
                  product_id: selectedProduct.id,
                  vendor_id: selectedProduct.vendor_id,
                  quantity: qtyToAdd,
                });

                await purchaseProduct(
                  selectedProduct.id,
                  selectedProduct.vendor_id,
                  qtyToAdd
                );
              }

              const updatedProducts = await getProducts();
              const updatedInventory = await getInventory();

              const merged = updatedProducts.map(p => {
                const inv = updatedInventory.find(i => i.product_id === p.id);
                return {
                  ...p,
                  stock: inv ? inv.quantity : 0,
                  status: (inv ? inv.quantity : 0) < 10 ? "LOW_STOCK" : "IN_STOCK",
                };
              });

              setProducts(merged);
              setShowStockModal(false);
            }}
            />
              {/* //   await updateStock(selectedProduct.product_id, newStock);
              //   setProducts(await getProducts());
              //   setShowStockModal(false);
              // }}
              // onCancel={() => setShowStockModal(false)}
            // /> */}
                          {/* stock: newStock,
                          status: newStock < 10 ? "LOW_STOCK" : "IN_STOCK",
                        }
                      : p
                  )
                );
                setShowStockModal(false);
              }}
              onCancel={() => setShowStockModal(false)}
            /> */}
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
        {showSellModal && selectedProduct && (
              <Modal title="Sell Product" onClose={() => setShowSellModal(false)}>
                <SellProductForm
                  product={selectedProduct}
                  onSell={async (qty) => {
                    await sellProduct(selectedProduct.id, qty);

                    const updatedProducts = await getProducts();
                    const updatedInventory = await getInventory();

                    const merged = updatedProducts.map(p => {
                      const inv = updatedInventory.find(i => i.product_id === p.id);
                      return {
                        ...p,
                        stock: inv ? inv.quantity : 0,
                        status: (inv ? inv.quantity : 0) < 10 ? "LOW_STOCK" : "IN_STOCK",
                      };
                    });

                    setProducts(merged);
                    setShowSellModal(false);
                  }}
                  onCancel={() => setShowSellModal(false)}
                />
              </Modal>
            )}

      <Table headers={["SKU", "Name", "Vendor", "Price", "Stock", "Status", "Actions"]}>
        {products.map(p => (
          <tr key={p.product_id} className="text-center border-t">
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>
              {vendors.find(v => v.id === p.vendor_id)?.name || "Unknown"}
            </td>
            <td>Rs.{p.price}/-</td>
            <td>{p.stock}</td>
            <td className={p.status === "LOW_STOCK" ? "text-red-500" : "text-green-600"}>
              {p.status}
            </td>
            <td>
              <button
                  onClick={() => {
                    setSelectedProduct(p);//
                    setShowSellModal(true);
                  }}
                  className="ml-2 text-red-600 hover:underline"
                >
                  Sell/
                </button>

              {canUpdateStock(user.role) && (
                <button
                  onClick={() => {
                    console.log("Clicked Update Stock", p);
                    setSelectedProduct(p);
                    setShowStockModal(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  /Add Stock
                </button>
              )}
            </td>
              <td className="space-x-2">
                {user.role === ROLES.ADMIN && (
                  <>
                    {/* <button
                      onClick={() => setEditProduct(p)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button> */}

                    <button
                      onClick={async () => {
                        await deleteProduct(p.id);
                        setProducts(await getProducts());
                      }}
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



