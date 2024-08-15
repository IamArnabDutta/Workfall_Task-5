import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import group from '../assets/Group.png';
import Loader from './Loader';

const Login = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formTouched, setFormTouched] = useState({
        email: false,
        password: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateForm = () => {
        const savedEmail = localStorage.getItem('signupEmail');
        const savedPassword = localStorage.getItem('signupPassword');

        let errors = {};

        // Validate email
        if (formTouched.email) {
            if (!email) errors.email = 'Email is required';
            else if (email !== savedEmail) errors.email = 'Invalid email address';
        }

        // Validate password
        if (formTouched.password) {
            if (!password) errors.password = 'Password is required';
            else if (password !== savedPassword) errors.password = 'Invalid password';
        }

        // Check if form is valid
        const formIsValid = Object.keys(errors).length === 0 && email && password === savedPassword;

        setFormErrors(errors);
        setIsFormValid(formIsValid);
    };

    React.useEffect(() => {
        validateForm();
    }, [email, password, formTouched]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmail(value);
            setFormTouched((prev) => ({ ...prev, email: true }));
        } else if (name === 'password') {
            setPassword(value);
            setFormTouched((prev) => ({ ...prev, password: true }));
        }

        validateForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid) {
            setIsLoading(true);

            // Generate and store token
            const token = btoa(`${email}:${password}`); //The btoa() method encodes a string in base-64.
            localStorage.setItem('authToken', token);

            toast.success('Login Successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard');
            }, 2000);
        } else {
            toast.error('Please fix the errors and try again.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full">
            {isLoading && <Loader />}
            {/* Left Part */}
            <div className="w-full bg-gray-100 p-4 flex justify-center article-container">
                <div className="article-content text-center">
                    <img src={group} alt="Login" className="article-img" />
                </div>
            </div>

            {/* Login Form */}
            <div className="w-full p-8 flex justify-center bg-gray-100 header-section">
                <form className="bg-white rounded px-4 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4 title">
                        <h2 className="text-xl font-bold">Welcome back! Sign in to access your Workfall account</h2>
                    </div>
                    <div className="mb-6">
                        <h2 style={{ color: '#174168' }}>
                            Don't have a Workfall account?{' '}
                            <Link to="/signup" className="text-blue-500" style={{ color: '#F16429', fontWeight: 600 }}>
                                Sign Up
                            </Link>
                        </h2>
                    </div>

                    <div className="mb-6">
                        <div
                            className="relative flex items-center justify-center border border-gray-300 rounded py-2"
                            style={{ border: '1px solid #0185FF33', fontWeight: 600, background: '#0185FF33' }}
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 mr-3" alt="Google Logo" />
                            <span className="font-semibold text-gray-700 text-sm" style={{ color: '#174168' }}>
                                Sign in with Google
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 text-center">
                        <div className="line-with-text">
                            <hr className="line" />
                            <span className="text" style={{ color: '#174168', fontWeight: 700 }}>
                                or
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.email && formTouched.email ? 'border-red-500' : ''}`}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={handleChange}
                        />
                        {formErrors.email && formTouched.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <div className="relative">
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.password && formTouched.password ? 'border-red-500' : ''}`}
                                id="password"
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                            />
                            <i
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </div>
                        {formErrors.password && formTouched.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                    </div>

                    <div className="mb-2">
                        <Link to="/forgot-password" style={{ color: '#F16429', fontWeight: 400 }}>
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="mb-4">
                        <button
                            className={`shadow appearance-none border rounded w-full py-2 px-3 my-3 leading-tight focus:outline-none focus:shadow-outline ${isFormValid ? 'bg-[#FF6745] text-white' : 'bg-[#FF6745] text-white opacity-50 cursor-not-allowed'}`}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default Login;
