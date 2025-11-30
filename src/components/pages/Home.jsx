import React, {  useEffect, useState } from 'react';
import Products from './Products';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className='text-center'>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Products products={products} />
        </div>
    );
};

export default Home;
