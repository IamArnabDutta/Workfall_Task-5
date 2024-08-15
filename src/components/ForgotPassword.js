import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import image from '../assets/image.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formTouched, setFormTouched] = useState({
        password: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleNewPasswordToggle = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateForm = () => {
        const savedPassword = localStorage.getItem('signupPassword');
        let errors = {};

        if (formTouched.password) {
            if (!password) errors.password = 'Password is required';
            else if (password !== savedPassword) errors.password = 'Password is incorrect';
        }

        if (formTouched.newPassword) {
            if (!newPassword) errors.newPassword = 'New Password is required';
            else if (newPassword === savedPassword) errors.newPassword = 'New password cannot be the same as the old password';
        }

        if (formTouched.confirmPassword) {
            if (!confirmPassword) errors.confirmPassword = 'Confirm Password is required';
            else if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0 && password && newPassword && confirmPassword);
    };

    useEffect(() => {
        validateForm();
    }, [password, newPassword, confirmPassword, formTouched]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'password') {
            setPassword(value);
            setFormTouched((prev) => ({ ...prev, password: true }));
        } else if (name === 'newPassword') {
            setNewPassword(value);
            setFormTouched((prev) => ({ ...prev, newPassword: true }));
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
            setFormTouched((prev) => ({ ...prev, confirmPassword: true }));
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid) {
            setIsLoading(true);
            localStorage.setItem('signupPassword', newPassword);
            toast.success('Password updated successfully', {
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
            toast.error('Please fix the errors and try again.');
        }
    };



    return (
        <div className="flex flex-col md:flex-row w-full">
            {isLoading && <Loader />}
            {/* Left Part */}
            <div className="w-full bg-gray-100 p-4 flex justify-center article-container">
                <div className="article-content text-center">
                    <img src={image} alt="Forgot Password" className="article-img" />
                </div>
            </div>

            {/* Password Update Form */}
            <div className="w-full p-10 flex justify-center bg-gray-100 header-section">
                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md my-7" onSubmit={handleSubmit}>
                    <div className="mb-6 title">
                        <h2 className="text-xl font-bold">Take your Career to new heights!</h2>
                    </div>

                    {/* Password */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
                        <div className="relative">
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.password && formTouched.password ? 'border-red-500' : ''}`}
                                id="password"
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Old Password"
                                value={password}
                                onChange={handleChange}
                            />
                            <i
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
                                onClick={handlePasswordToggle}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </div>
                        {formErrors.password && formTouched.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                    </div>

                    {/* New Password */}
                    <div className="mb-6 relative">
                        <label htmlFor="new-password" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                        <div className="relative">
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.newPassword ? 'border-red-500' : ''}`}
                                id="new-password"
                                name="newPassword"
                                type={newPasswordVisible ? 'text' : 'password'}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={handleChange}
                            />
                            <i
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
                                onClick={handleNewPasswordToggle}
                            >
                                {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </div>
                        {formErrors.newPassword && <p className="text-red-500 text-xs mt-1">{formErrors.newPassword}</p>}
                    </div>

                    {/* Confirm New Password */}
                    <div className="mb-6 relative">
                        <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                                id="confirm-password"
                                name="confirmPassword"
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                            <i
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
                                onClick={handleConfirmPasswordToggle}
                            >
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </div>
                        {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
                    </div>

                    {/* Update Button */}
                    <div className="mb-4">
                        <button
                            className={`shadow appearance-none border rounded w-full py-2 px-3 my-3 leading-tight focus:outline-none focus:shadow-outline ${isFormValid ? 'bg-[#FF6745] text-white' : 'bg-[#FF6745] text-white opacity-50 cursor-not-allowed'}`}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
