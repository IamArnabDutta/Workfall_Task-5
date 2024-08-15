import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const Review = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [page, setPage] = useState(1);
    const productsPerPage = 5;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
                setDisplayedProducts(response.data.slice(0, productsPerPage));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleNextPage = () => {
        const nextPage = page + 1;
        const newDisplayedProducts = products.slice(0, nextPage * productsPerPage);
        setDisplayedProducts(newDisplayedProducts);
        setPage(nextPage);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        }
        return stars;
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <Oval
                height={60}
                width={60}
                color="#FF6745"
                ariaLabel="loading"
            />
        </div>
    );

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-8 bg-[#FBF7F4] shadow-md rounded-lg">
            {displayedProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                    <article className="mb-8">
                        <div className="flex items-center mb-4">
                            <img className="w-10 h-10 me-4 rounded-full" src={product.image} alt={product.title} />
                            <div className="font-medium dark:text-[#FF6745]">
                                <p>{product.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                            {renderStars(product.rating.rate)}
                            <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">{product.category}</h3>
                        </div>
                        <footer className="mb-5 text-sm text-gray-500 dark:text-gray-500">
                            <p>Price: ${product.price}</p>
                        </footer>
                        <p className="mb-2 text-gray-500 dark:text-gray-500">{product.description}</p>
                        <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                    </article>
                    {index < displayedProducts.length - 1 && (
                        <hr className="my-2 border-t border-[#17416830]" />
                    )}
                </React.Fragment>
            ))}
            {displayedProducts.length < products.length && (
                <div className="col-span-full flex justify-center mt-8">
                    <button 
                        type="button" 
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={handleNextPage}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Review;
