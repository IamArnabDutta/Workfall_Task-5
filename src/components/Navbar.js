import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { FaBars, FaRegBell, FaTimes } from 'react-icons/fa';
import { LuUserCircle2 } from 'react-icons/lu';
import { AiOutlineLogin } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation(); // The useLocation hook is used to get the current location.
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('');

    const links = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/dashboard/associates', label: 'Associates' },
        { to: '/dashboard/workoffers', label: 'WorkOffers' },
        { to: '/workstreams', label: 'WorkStreams' },
        { to: '/earning', label: 'Earning' },
        { to: '/dashboard/reviews', label: 'Reviews' },
        { to: '/dashboard/clients', label: 'Clients' },
        { to: '/calls', label: 'Calls' },
        { to: '/chats', label: 'Chats' },
    ];


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const userEmail = localStorage.getItem('signupEmail');
    const userFirstName = localStorage.getItem('firstname');
    const userLastName = localStorage.getItem('lastname');
    const userFullName = userFirstName && userLastName ? `${userFirstName} ${userLastName}` : 'User';

    const handleLogout = () => {

        localStorage.removeItem('authToken');


        navigate('/login');


        setTimeout(() => {
            toast.success('Successfully logged out');
        }, 100);
    };

    // Determine the current route
    const isSignUpRoute = location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/forgot-password';
    const isLoginRoute = location.pathname === '/login';

    const isDashboardRoute = location.pathname.startsWith('/dashboard');

    return (
        <>
            <nav className="bg-white shadow-md" style={{ borderBottom: '1px solid #D9D9D9' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                aria-expanded="false"
                                onClick={toggleMenu}
                            >
                                {menuOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:block sm:ml-14">
                                <div className="flex space-x-4">
                                    {isSignUpRoute && (
                                        <>
                                            <a href="#" className="navbar-link navbar-item">WHY WORKFALL</a>
                                            <a href="#" className="navbar-link navbar-item">JOIN US</a>
                                            <a href="#" className="navbar-link navbar-item">PARTNERS</a>
                                            <a href="#" className="navbar-link navbar-item">CLIENTS</a>
                                            <div className="flex-shrink-0">
                                                <img className="h-8 w-auto my-2 mr-6" src={logo} alt="Your Company" />
                                            </div>
                                            <a href="#" className="navbar-link navbar-item">BLOG</a>
                                            <a href="#" className="navbar-link navbar-item">ARE YOU HIRING</a>
                                            <Link to="/signup" className="navbar-link navbar-item">SIGN UP</Link>
                                            <Link to="/login" className="navbar-link navbar-item">SIGN IN</Link>
                                        </>
                                    )}
                                    {isDashboardRoute && (
                                        <>
                                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">


                                                <div className="hidden sm:flex space-x-1">
                                                    <div className="flex flex-shrink-0 items-center">
                                                        <img className="h-8 w-auto " src={logo} alt="Your Company" />
                                                        <span className="rounded-md px-1 py-1 text-500 font-medium  mb-1 text-[#FF6745]">Workfall</span>
                                                    </div>
                                                    {links.map((link) => (
                                                        <Link
                                                            key={link.to}
                                                            to={link.to}
                                                            onClick={() => setActiveLink(link.to)}
                                                            className={`rounded-md px-3 py-2 text-sm font-medium uppercase ${activeLink === link.to ? 'text-[#FF6745] ' : 'text-gray-500'
                                                                } hover:text-[#FF6745]`}
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    ))}

                                                </div>

                                                <div className="flex items-center space-x-4 px-3">
                                                    <div className="relative">
                                                        <div className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={toggleDropdown}>
                                                            <FaRegBell className="w-4 h-5 text-[#FF6745]" />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2"> {/* Use space-x-2 to control horizontal spacing */}
                                                        <div className="relative">
                                                            <div className={`cursor-pointer flex items-center ${dropdownOpen ? 'text-[#FF6745]' : 'text-black'}`} onClick={toggleDropdown}>
                                                                <LuUserCircle2 className="w-5 h-5" />
                                                            </div>

                                                            {dropdownOpen && (
                                                                <div className="relative">
                                                                    <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-50">
                                                                        <div className="px-4 py-3">
                                                                            <span className="block text-sm text-gray-900 dark:text-white">{userFullName}</span>
                                                                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{userEmail}</span>
                                                                        </div>
                                                                        <ul className="py-2">
                                                                            <li>
                                                                                <button
                                                                                    onClick={handleLogout}
                                                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center"
                                                                                >
                                                                                    Sign out
                                                                                    <AiOutlineLogin className="ml-2" />
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="hidden sm:flex items-center ml-2 "> {/* Adjust ml-2 as needed */}
                                                            <div className="text-sm font-medium text-black-500 ">
                                                                Welcome
                                                                <div className="flex flex-col items-start">
                                                                    <span className="text-sm text-gray-900 dark:text-[#FF6745]">{userFirstName}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </>

                                    )}
                                    {isLoginRoute && (
                                        <>
                                            <div className="max-w-7xl sm:px-6 lg:px-8">
                                                <div className="relative flex h-16 items-center justify-between">
                                                    <div className="flex flex-1 items-center sm:items-stretch sm:justify-start -ml-14">
                                                        <div className="flex flex-shrink-0 items-center ml-0">
                                                            <img className="h-8 w-auto" src={logo} alt="Your Company" />
                                                            <a href="#" className="ml-1 text-sm text-gray-500 hover:text-gray-700">
                                                                <span className="text-[#F16429] font-semibold">Workfall</span>
                                                                <p className="text-[#FCB28E]">Find the very best</p>
                                                            </a>
                                                        </div>

                                                        <div className="hidden sm:flex sm:space-x-0 sm:ml-2">
                                                            <a href="#" className="text-sm font-medium text-black px-3 py-2 rounded-md">Pricing</a>
                                                            <a href="#" className="text-sm font-medium text-black px-3 py-2 rounded-md">Blog</a>
                                                            <a href="#" className="text-sm font-medium text-black px-3 py-2 rounded-md">Stories</a>
                                                            <a href="#" className="text-sm font-medium text-black px-3 py-2 rounded-md">Want to Work with us?</a>
                                                            <a href="#" className="text-sm font-medium text-[#F16429] px-3 py-2 rounded-md">Hire Now</a>
                                                        </div>
                                                    </div>

                                                    <div className="hidden sm:flex sm:items-center sm:space-x-1 pl-28 pr-1">
                                                        <a href="#" className="text-sm font-medium text-[#A7A7A7] px-4 mb-0 py-2 rounded-md">+1 650 900 2022</a>
                                                        <a href="#" className="text-sm font-medium text-[#A7A7A7] px-3 mb-0 rounded-md">contact@workfall.com</a>
                                                    </div>

                                                    <div className="hidden sm:flex sm:items-center sm:space-x-1 px-18 ">

                                                        <Link to="/signup" className="rounded-md px-6 py-2 text-sm font-medium text-gray-500 hidden sm:block">
                                                            <button className="bg-[#FF6745] hover:bg-[#FF6745] text-white py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
                                                                SignUp
                                                            </button>
                                                        </Link>

                                                    </div>

                                                </div>
                                            </div>
                                        </>

                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {isSignUpRoute && (
                                <>
                                    <a href="#" className="block navbar-link navbar-item">WHY WORKFALL</a>
                                    <a href="#" className="block navbar-link navbar-item">JOIN US</a>
                                    <a href="#" className="block navbar-link navbar-item">PARTNERS</a>
                                    <a href="#" className="block navbar-link navbar-item">CLIENTS</a>
                                    <a href="#" className="block navbar-link navbar-item">BLOG</a>
                                    <a href="#" className="block navbar-link navbar-item">ARE YOU HIRING</a>
                                    <Link to="/signup" className="block navbar-link navbar-item">SIGN UP</Link>
                                    <Link to="/login" className="block navbar-link navbar-item">SIGN IN</Link>
                                </>
                            )}
                            {isDashboardRoute && (
                                <>
                                    <Link to="/dashboard" className="block navbar-link navbar-item">Dashboard</Link>
                                    <Link to="/associates" className="block navbar-link navbar-item">Associates</Link>
                                    <Link to="/dashboard/workoffers" className="block navbar-link navbar-item">WorkOffers</Link>
                                    <Link to="/workstreams" className="block navbar-link navbar-item">WorkStreams</Link>
                                    <Link to="/earning" className="block navbar-link navbar-item">Earning</Link>
                                    <Link to="/dashboard/reviews" className="block navbar-link navbar-item">Reviews</Link>
                                    <Link to="/dashboard/clients" className="block navbar-link navbar-item">Clients</Link>
                                    <Link to="/calls" className="block navbar-link navbar-item">Calls</Link>
                                    <Link to="/chats" className="block navbar-link navbar-item">Chats</Link>
                                </>
                            )}
                            {isLoginRoute && (
                                <>
                                    <Link to="/dashboard" className="block navbar-link navbar-item">Pricing</Link>
                                    <Link to="/associates" className="block navbar-link navbar-item">Blogs</Link>
                                    <Link to="/workoffers" className="block navbar-link navbar-item">Stories</Link>
                                    <Link to="/workstreams" className="block navbar-link navbar-item">Want to Work with us</Link>
                                    <Link to="/earning" className="block navbar-link navbar-item">Hire Now</Link>
                                    <Link to="/reviews" className="block navbar-link navbar-item">+1 650 900 2022</Link>
                                    <Link to="/clients" className="block navbar-link navbar-item">contact@workfall.com</Link>
                                    <Link to="/login" className="block navbar-link navbar-item">Log In</Link>

                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Toast container */}
            <ToastContainer />
        </>
    );
};

export default NavBar;
