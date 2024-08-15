import React, { useState } from 'react';
import dp from "../assets/dp.jpeg";
import { HiChevronDown, } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';


function Dashboard() {

    const experienceData = [
        { id: 1, value: '1 Year' },
        { id: 2, value: '2 Years' },
        { id: 3, value: '3 Years' },
        { id: 4, value: '4 Years' },
        { id: 5, value: '5 Years' },
        { id: 6, value: '6 Years' },
        { id: 7, value: '7 Years' },
        { id: 8, value: '8 Years' },
        { id: 9, value: '9 Years' },
        { id: 10, value: '10 Years' },
        { id: 11, value: '11 Years' },
        { id: 12, value: '12 Years' },
        { id: 13, value: '13 Years' },
        { id: 14, value: '14 Years' },
        { id: 15, value: '15 Years' },
        { id: 16, value: '16 Years' },
        { id: 17, value: '17 Years' },
        { id: 18, value: '18 Years' },
        { id: 19, value: '19 Years' },
        { id: 20, value: '20 Years' }
    ];
//'path/to/your/default/image.jpg'
    const [pic, setPic] = useState(dp);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        email: '',
        about: '',
        experience: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const [aboutCharCount, setAboutCharCount] = useState(0);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPic(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        if (id === 'about') {
            setAboutCharCount(value.length);
            if (value.length < 10) {
                setErrors((prevErrors) => ({ ...prevErrors, about: 'About Me must be at least 10 characters' }));
            } else if (value.length > 500) {
                setErrors((prevErrors) => ({ ...prevErrors, about: 'About Me must be less than 500 characters' }));
            } else {
                setErrors((prevErrors) => {
                    const { about, ...rest } = prevErrors;
                    return rest;
                });
            }
        }

        if (id === 'phone') {
            // Allow only digits in the phone number field
            if (!/^\d*$/.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number must contain only digits' }));
            } else if (value.length > 10) {
                setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number must be 10 digits' }));
            } else {
                setErrors((prevErrors) => {
                    const { phone, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
    };


    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.title) formErrors.title = 'Title is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
        if (!formData.about || formData.about.length < 10 || formData.about.length > 500) {
            formErrors.about = 'About Me must be between 10 and 500 characters';
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            formErrors.phone = 'Phone number must be 10 digits';
        }
        if (!formData.experience) formErrors.experience = 'Experience is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
        }
    };

    return (
        <div className="bg-white font-karla">
            <header className="py-2 px-14 bg-[#FBF7F4] font-bold">
                <Link to="/login" className="block py-1 px-8 flex items-center">
                    <GoArrowLeft />
                    <span className="ml-2">Go Back</span>
                </Link>
                <hr className="my-2 border-t border-[#17416830]" />
            </header>

            <section className="flex flex-wrap">
                <article className="w-full md:w-1/4 bg-[#FBF7F4] font-semibold">
                    <ul className="list-none p-12 text-[#40474B] py-0">
                        <li>
                            <a href="#" className="block py-2 px-8 bg-white-400 hover:bg-gray-100 ">
                                Agency Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-8 bg-white-400 hover:bg-gray-100 text-[#FF6745]">
                                My Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-8 bg-white-400 hover:bg-gray-100 ">
                                Add BRs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-8 bg-white-400 hover:bg-gray-100">
                                Payments
                                <span className="inline-block ml-2"><HiChevronDown /></span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-8 bg-white-400 hover:bg-gray-100 ">
                                Authorised Signatory
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-8 bg-white-400 hover:bg-gray-100 ">
                                Security
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-8 bg-white-400 hover:bg-gray-100 ">
                                General
                                <span className="inline-block ml-2"><HiChevronDown /></span>
                            </a>
                        </li>
                    </ul>
                </article>

                <article className="w-full md:w-3/4 px-14 py-4 bg-[#FBF7F4]">
                    <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4 flex items-center justify-center">
                            <input
                                className="hidden"
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <div className="w-20 h-20 rounded-full overflow-hidden">
                                <img
                                    id="previewImage"
                                    className="w-full h-full object-cover"
                                    src={pic}
                                    alt="Preview"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mb-4">
                            <label
                                htmlFor="image"
                                className="text-[#0185FF] underline cursor-pointer"
                            >
                                Upload
                            </label>
                        </div>
                        <div className="mb-4 flex flex-wrap">
                            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                />
                                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter Title"
                                />
                                {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#EFEFEF]"
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="about">
                                About Me
                            </label>
                            <div className="relative">
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    placeholder="Tell us about yourself"
                                    rows="5"
                                />
                                <div className="absolute bottom-2 right-3 text-gray-500 text-xs italic">
                                    {aboutCharCount}/500 characters
                                </div>
                            </div>
                            {errors.about && <p className="text-red-500 text-xs italic">{errors.about}</p>}
                        </div>

                        <div className="mb-4 flex flex-wrap">
                            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                                    Total Experience
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Experience</option>
                                    {experienceData.map((exp) => (
                                        <option key={exp.id} value={exp.value}>
                                            {exp.value}
                                        </option>
                                    ))}
                                </select>
                                {errors.experience && <p className="text-red-500 text-xs italic">{errors.experience}</p>}
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="text"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                />
                                {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                className="bg-[#FF6745] hover:bg-[#FF6745]/80 text-white font-semibold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </article>
            </section>
        </div>
    );
}

export default Dashboard;
