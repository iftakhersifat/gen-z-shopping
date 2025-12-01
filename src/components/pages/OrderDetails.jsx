import React, { useContext } from 'react';
import { useParams, Link } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';

export default function OrderDetails() {
  const { id } = useParams();
  const { orders = [] } = useContext(AuthContext);

  const order = orders.find(o => o.id && o.id.toString() === id);

  if (!order) return <p className='text-center mt-24'>Order not found</p>;

  return (
    <div className='max-w-3xl mx-auto px-4 mt-24'>
      <h1 className='text-3xl font-bold mb-4'>Order Details</h1>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
        <img src={order.image} alt={order.title} className="h-40 object-contain mb-4"/>
        <h2 className='text-xl font-semibold mb-2'>{order.title}</h2>
        <p className='mb-2'>Price: ${order.price}</p>
        <p className='text-gray-500 mb-4'>Order Date: {order.date}</p>
        <Link to="/dashboard" className='btn btn-outline w-full'>Back to Dashboard</Link>
      </div>
    </div>
  );
}
