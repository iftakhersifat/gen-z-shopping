import React, { useContext } from 'react';
import { useParams, Link } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';

export default function OrderDetails() {
  const { id } = useParams();
  const { orders = [] } = useContext(AuthContext);

  const order = orders.find(o => o.id && o.id.toString() === id);

  if (!order) return <p className='text-center mt-24'>Order not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12">
    <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">
    <span className="bg-linear-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Order Details</span>
    </h1>

  <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200">

    <div className="w-full h-64 bg-gray-100 rounded-xl mb-6 flex items-center justify-center shadow-md">
      <img src={order.image} alt={order.title} className="object-contain h-full p-4"/>
    </div>

    <h2 className="text-2xl font-semibold mb-4 text-gray-900">{order.title}</h2>

    <p className="text-lg font-semibold text-red-600 mb-2">Price: ${order.price}</p>

    <p className="text-gray-600 mb-6">Order Date: {order.date}</p>

    <Link to="/dashboard" className="btn w-full py-3 rounded-xl text-white text-lg bg-linear-to-r from-blue-500 to-indigo-600 hover:bg-blue-700">Back to Dashboard</Link>
  </div>
</div>

  );
}
