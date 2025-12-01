import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className='text-center mt-24 text-lg'>Loading...</p>;
  if (!product) return <p className='text-center mt-24 text-lg'>Product not found</p>;

  return (
    <div className='max-w-6xl mx-auto px-4 md:px-6 lg:px-0 mt-24'>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        
        {/* Product Image */}
        <div className='flex justify-center items-center md:w-1/2'>
          <img src={product.image} alt={product.title} className="w-full h-96 object-contain rounded-xl hover:scale-105 transition-transform duration-300"/>
        </div>

        {/* Product Info */}
        <div className='md:w-1/2 flex flex-col justify-between'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>{product.title}</h1>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>{product.description}</p>
            <p className='text-2xl font-semibold text-gray-800 mb-6'>${product.price}
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-4'>
            <Link 
            to={`/orders/new?productId=${product.id}`} 
            className="btn bg-linear-to-r from-green-500 to-emerald-600 text-white hover:bg-green-700"
          >
            Order Now
          </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
