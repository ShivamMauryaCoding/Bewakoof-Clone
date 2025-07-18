import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

function AddToCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [updateQtyMap, setUpdateQtyMap] = useState({}); // For tracking quantity per item

  const getDataFromServer = () => {
    axios
      .get("http://localhost:3000/cart")
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:3000/cart/${id}`)
      .then(() => getDataFromServer())
      .catch((err) => console.error(err));
  };

  const handleQtyChange = async (id, quantity) => {
    try {
      await axios.patch(`http://localhost:3000/cart/${id}`, {
        quantity: Number(quantity),
      });
      getDataFromServer();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-4 pt-28 pb-12">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl m-auto">
        {/* Cart Items */}
        <div className="w-full lg:w-[65%] space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-md"
            >
              <img src={item.image} alt="" width="120px" className="rounded" />
              <div className="flex-1">
                <h2 className="font-semibold text-sm mb-1">
                  {item.description}
                </h2>
                <div className="flex gap-3 items-center mb-2">
                  <span className="text-xl font-bold text-[#292D35]">
                    ₹{item.price}
                  </span>
                  <span className="line-through text-sm text-gray-400">
                    ₹{item.lastPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`qty-${item.id}`} className="text-sm">
                    Qty:
                  </label>
                  <select
                    id={`qty-${item.id}`}
                    value={item.quantity}
                    className="border px-2 py-1 rounded"
                    onChange={(e) => handleQtyChange(item.id, e.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end sm:justify-center items-start">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleRemove(item.id)}
                >
                  <MdDeleteOutline size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="w-full lg:w-[35%] border rounded-md p-5 h-fit">
          <h2 className="text-lg font-semibold mb-4">Price Details</h2>
          <div className="flex justify-between mb-2 text-sm">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Total Price</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between font-semibold text-md border-t pt-2 mt-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <button className="mt-5 w-full bg-yellow-400 py-2 font-semibold rounded hover:bg-yellow-300 transition-all">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCartPage;
