import React, { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function MyOrderList() {
  const { orders, removeOrder } = useContext(AuthContext);

  const handleCancelOrder = (orderId) => {
    removeOrder(orderId);
    toast.success("Order canceled successfully!");
  };

  if (orders.length === 0) return <p className="text-center mt-24">No confirmed orders.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={order.image} alt={order.title} className="object-contain w-full h-full" />
              </div>
              <div>
                <p className="font-semibold">{order.title}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
                <p className="text-sm font-medium">Price: ${order.price}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link to={`/orders/${order.id}`} className="btn btn-outline btn-sm">View</Link>
              <button onClick={() => handleCancelOrder(order.id)} className="btn btn-error btn-sm">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
