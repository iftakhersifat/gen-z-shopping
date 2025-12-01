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
    <div className="max-w-4xl mx-auto mt-12 px-6 md:px-6 lg:px-0">

      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent ">My Order List
      <div className="mt-2 w-20 h-0.5 mx-auto bg-linear-to-r from-cyan-400 to-indigo-500 opacity-80 rounded-full"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl border border-green-200 p-6 shadow flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">

              <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0">
                <img src={order.image} alt={order.title} className="object-contain p-2 w-full h-full" />
              </div>

              <div>
                <p className="font-semibold">{order.title}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
                <p className="text-sm font-medium text-red-600">Price: ${order.price}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link to={`/orders/${order.id}`} className="btn btn-outline btn-sm text-white rounded-xl bg-linear-to-r from-blue-500 to-indigo-600">View</Link>
              <button onClick={() => handleCancelOrder(order.id)} className="btn btn-error btn-sm text-white rounded-xl bg-linear-to-r from-red-500 to-pink-500">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
