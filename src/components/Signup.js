import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import image from '../assets/image.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';


const Signup = () => {
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreeToTerms: false
    });
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validateName = (name) => name.length >= 6 && name.length <= 12;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormValues({ ...formValues, [name]: type === 'checkbox' ? checked : value });

        // Real-time validation
        let error = '';
        if (name === 'firstName' || name === 'lastName') {
            error = validateName(value) ? '' : `${name === 'firstName' ? 'First name' : 'Last name'} must be 6-12 characters long.`;
        } else if (name === 'email') {
            error = validateEmail(value) ? '' : 'Invalid email address.';
        } else if (name === 'password') {
            error = validatePassword(value) ? '' : 'Password must contain at least 1 letter, 1 number, and 1 special character.';
        } else if (name === 'agreeToTerms') {
            error = checked ? '' : 'You must agree to the terms and conditions.';
        }

        setFormErrors({ ...formErrors, [name]: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, agreeToTerms } = formValues;

        // Final validation on submit
        const errors = {
            firstName: validateName(firstName) ? '' : 'First name must be 6-12 characters long.',
            lastName: validateName(lastName) ? '' : 'Last name must be 6-12 characters long.',
            email: validateEmail(email) ? '' : 'Invalid email address.',
            password: validatePassword(password) ? '' : 'Password must contain at least 1 letter, 1 number, and 1 special character.',
            agreeToTerms: agreeToTerms ? '' : 'You must agree to the terms and conditions.'
        };

        setFormErrors(errors);
        setIsFormValid(Object.values(errors).every(error => error === ''));

        if (Object.values(errors).every(error => error === '')) {
            // console.log('Successfully submitted', formValues);
            setIsLoading(true);


            // Save to localStorage
            localStorage.setItem('signupEmail', email);
            localStorage.setItem('signupPassword', password);
            localStorage.setItem('firstname', firstName);
            localStorage.setItem('lastname', lastName);
            toast.success('Signup Successfull!', {
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
                navigate('/login');
            }, 2000);
        } else {
            // Show error toast
            toast.error('Please fix the errors in the form.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        setIsFormValid(Object.values(formErrors).every(error => error === '') && Object.values(formValues).every(value => value));
    }, [formErrors, formValues]);

    return (
        <div className="flex flex-col md:flex-row w-full">
             {isLoading && <Loader />}
            {/* Left Part */}
            <div className="w-full bg-gray-100 p-4 flex justify-center article-container">
                <div className="article-content text-center">
                    <img src={image} alt="Sign Up" className="article-img" />
                </div>
            </div>

            {/* Sign-Up Form */}
            <div className="w-full p-8 flex justify-center bg-gray-100 header-section">
                <form className="bg-white rounded px-4 pt-0 pb-8 mb-4 w-full max-w-md relative" onSubmit={handleSubmit}>
                    <div className="mb-4 title">
                        <h2 className="text-xl font-bold">Take your Career to new heights!</h2>
                    </div>

                    <div className="mb-6">
                        <h2 style={{ color: '#174168' }}>
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-500" style={{ color: '#F16429', fontWeight: 600 }}>
                                Sign in
                            </a>
                        </h2>
                    </div>

                    <div className="mb-6">
                        <div
                            className="relative flex items-center justify-center border border-gray-300 rounded py-2"
                            style={{ border: '1px solid #0185FF33', fontWeight: 600, background: '#0185FF33' }}
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 mr-3" alt="Google Logo" />
                            <span className="font-semibold text-gray-700 text-sm" style={{ color: '#174168' }}>
                                Sign up with Google
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

                    <div className="mb-6 flex flex-wrap">
                        <div className="w-full md:w-1/2 md:pr-2">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={formValues.firstName}
                                onChange={handleChange}
                            />
                            {formErrors.firstName && <p className="text-red-500 text-xs italic">{formErrors.firstName}</p>}
                        </div>
                        <div className="w-full mt-4 md:mt-0 md:w-1/2 md:pl-2">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={formValues.lastName}
                                onChange={handleChange}
                            />
                            {formErrors.lastName && <p className="text-red-500 text-xs italic">{formErrors.lastName}</p>}
                        </div>
                    </div>

                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
                    </div>


                    <div className="mb-4 relative">
                        <div className="relative">
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                id="password"
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            <i
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </div>
                        {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password}</p>}
                    </div>


                    <div className="mb-4 flex items-center">
                        <input
                            id="agreeToTerms"
                            name="agreeToTerms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            checked={formValues.agreeToTerms}
                            onChange={handleChange}
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 text-sm font-small text-gray-900" style={{ color: '#174168' }}>
                            I agree with Workfall's <b>Terms of services</b> and <b>Privacy Policy</b>
                        </label>
                    </div>
                    {formErrors.agreeToTerms && <p className="text-red-500 text-xs italic mb-4">{formErrors.agreeToTerms}</p>}

                    <div className="mb-6">
                        <button
                            className={`shadow appearance-none border rounded w-full py-2 px-3 my-3 leading-tight focus:outline-none focus:shadow-outline 
        ${isFormValid ? 'bg-[#FF6745] text-white' : 'bg-[#FF6745] text-white opacity-50 cursor-not-allowed'}`}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Sign Up
                        </button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
