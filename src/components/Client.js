import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const Client = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://reqres.in/api/users?page=2');
                setUsers(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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


    return (
        <div className="min-h-screen  pt-14 pb-16">
            <div className="mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 text-[#FF6745]">
                    {users.map(user => (
                        <div key={user.id} className="bg-[#FBF7F4] rounded-lg overflow-hidden shadow-lg border border-gray-300 dark:border-gray-200">
                            <div className="border-b px-4 pb-6 ">
                                <div className="text-center my-4">
                                    <img className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                                        src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                                    <div className="py-2">
                                        <h3 className="font-bold  text-lg sm:text-2xl text-[#FF6745] mb-1">{user.first_name} {user.last_name}</h3>
                                        <div className="inline-flex text-gray-700 dark:text-gray-500 items-center">
                                            <svg className="h- w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-600 mr-1 mt-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M12 13.5L5 7H19L12 13.5ZM4 5H20C20.55 5 21 5.45 21 6V18C21 18.55 20.55 19 20 19H4C3.45 19 3 18.55 3 18V6C3 5.45 3.45 5 4 5ZM12 15.5L19 9H5L12 15.5Z" />
                                            </svg>

                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 px-2">
                                    <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2 text-sm sm:text-base">
                                        Follow
                                    </button>
                                    <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2 text-sm sm:text-base">
                                        Message
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 py-4">
                                <div className="flex gap-2 items-center text-gray-800 dark:text-gray-500 mb-4">
                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" />
                                    </svg>
                                    <span><strong className="text-black dark:text-gray-500">12</strong> Followers you know</span>
                                </div>
                                <div className="flex">
                                    <div className="flex justify-end mr-2">
                                        {/* Sample images for followers */}
                                        {[1, 2, 3, 4, 5, 6].map((index) => (
                                            <img key={index} className="border-2 border-white dark:border-gray-800 rounded-full h-8 w-8 sm:h-10 sm:w-10 -mr-2"
                                                src={`https://randomuser.me/api/portraits/men/${index}.jpg`} alt="" />
                                        ))}
                                        <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-8 w-8 sm:h-10 sm:w-10">
                                            +999
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Client;
