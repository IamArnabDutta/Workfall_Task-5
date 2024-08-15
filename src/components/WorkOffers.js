import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const WorkOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('https://jsonfakery.com/jobs');
                setOffers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

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

    const displayedOffers = offers.slice(0, page * itemsPerPage);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="work-offers-page p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedOffers.map((offer) => (
                <div key={offer.id} className="relative flex flex-col h-full min-w-0 p-4 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="relative h-full overflow-hidden bg-cover rounded-xl" style={{ backgroundImage: `url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard/assets/img/ivancik.jpg')` }}>
                        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
                        <div className="relative z-10 flex flex-col flex-auto h-full p-4">
                            <h5 className="pt-2 mb-4 font-bold text-[#FF6745]">{truncateText(offer.title, 30)}</h5>
                            <p className="text-white mt-2 mb-4">{truncateText(offer.description, 100)}</p>
                            <a className="mt-auto mb-0 font-semibold leading-normal text-[#FCB28E] group text-sm" href="javascript:;">
                                Read More.....
                                <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
            {page * itemsPerPage < offers.length && (
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

export default WorkOffers;
