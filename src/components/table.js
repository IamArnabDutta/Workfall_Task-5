import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Table = ({ formDataArray, handleEdit, handleDelete, formatDate }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(formDataArray.length / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = formDataArray.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="relative overflow-x-auto sm:rounded-lg mt-6">
            <div className="block md:hidden">
                {/* Mobile view: Stack rows as cards */}
                {currentItems.map((data, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-md shadow-sm bg-white">
                        <div className="flex flex-col space-y-2">
                            <div className="text-lg font-semibold">{data.firstName} {data.lastName}</div>
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm font-medium text-gray-600">DOB: {formatDate(data.dob)}</span>
                                <span className="text-sm font-medium text-gray-600">Gender: {data.gender}</span>
                                <span className="text-sm font-medium text-gray-600">Email: {data.email}</span>
                                <span className="text-sm font-medium text-gray-600">Phone: {data.phone}</span>
                                <span className="text-sm font-medium text-gray-600">Subject: {data.subject}</span>
                            </div>
                            <div className="mt-2 flex space-x-2">
                                <button
                                    className="text-blue-600 hover:text-blue-900"
                                    onClick={() => handleEdit(startIndex + index)}
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => handleDelete(startIndex + index)}
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="hidden md:block">
                {/* Desktop view: Table */}
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-x-auto border border-gray-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#FBF7F4] text-[#FF6745] font-medium">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">First Name</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">Last Name</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">DOB</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">Gender</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">Phone</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">Subject</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((data, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-sm text-gray-500">{data.firstName}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{data.lastName}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formatDate(data.dob)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{data.gender}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{data.email}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{data.phone}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{data.subject}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900"
                                                    onClick={() => handleEdit(startIndex + index)}
                                                >
                                                    <FaEdit size={20} />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDelete(startIndex + index)}
                                                >
                                                    <FaTrash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-[#FF6745] font-bold">
                            Showing <span className="font-medium ">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, formDataArray.length)}</span> of <span className="font-medium">{formDataArray.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    aria-current={currentPage === index + 1 ? "page" : undefined}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
