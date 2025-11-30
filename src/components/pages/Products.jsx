import React from 'react';

const Products = ({ products }) => {
    return (
        <div className='max-w-6xl mx-auto px-6 md:px-6 lg:px-0 mt-24'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
                <div key={product.id} className="card p-4 shadow">
                    <img src={product.image} alt={product.title} className="h-40 object-contain" />
                    <h3 className="mt-2 font-bold">{product.title}</h3>
                    <p className="mt-1">${product.price}</p>
                    <button>More Details</button>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Products;
