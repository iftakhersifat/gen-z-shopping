import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../Firebase/AuthProvider';

export default function Orders() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState(null);
  const { addOrder } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(console.error);
    }
  }, [productId]);

  const handleConfirmOrder = () => {
    if (!product) return;
    addOrder({
      id: Date.now().toString(),
      productId: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.image,
      date: new Date().toLocaleString()
    });
    toast.success('Order Confirmed!');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  if (!product) return <p className='text-center mt-24'>Loading product...</p>;

  return (
    <div className='max-w-3xl mx-auto px-4 mt-24'>
      <h1 className='text-3xl font-bold mb-6'>Confirm Your Order</h1>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>{product.title}</h2>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>{product.description}</p>
        <p className='font-semibold mb-4'>Price: ${product.price}</p>
        <button 
          onClick={handleConfirmOrder} 
          className='btn bg-gradient-to-r from-green-500 to-emerald-600 text-white w-full hover:bg-green-700'
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
