import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Modal from '../components/Modal';
import Table from './table';

function Form() {
    const [formDataArray, setFormDataArray] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'delete' or 'submit'
    const [formErrors, setFormErrors] = useState({});
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        subject: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const validateField = (name, value) => {
        const errors = { ...formErrors };

        switch (name) {
            case 'firstName':
                errors.firstName = value.trim() ? '' : 'First name is required.';
                break;
            case 'lastName':
                errors.lastName = value.trim() ? '' : 'Last name is required.';
                break;
            case 'dob':
                if (!value.trim()) {
                    errors.dob = 'Date of birth is required.';
                } else {
                    const dobDate = new Date(value);
                    const cutoffYear = 2006;
                    errors.dob = dobDate.getFullYear() < cutoffYear ? '' : `Date of birth must be before ${cutoffYear}.`;
                }
                break;
            case 'gender':
                errors.gender = value ? '' : 'Gender is required.';
                break;
            case 'email':
                errors.email = value.trim() ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? '' : 'Invalid email address.' : 'Email is required.';
                break;
            case 'phone':
                errors.phone = value.trim() ? /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits.' : 'Phone number is required.';
                break;
            case 'subject':
                errors.subject = value ? '' : 'Subject is required.';
                break;
            default:
                break;
        }

        setFormErrors(errors);
    };

    const validateForm = () => {
        const allFieldsValid = Object.values(formErrors).every((error) => error === '');
        const allFieldsFilled = Object.values(formValues).every((value) => value.trim() !== '');
        setIsFormValid(allFieldsValid && allFieldsFilled);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'radio' ? (checked ? value : '') : value;

        setFormValues({
            ...formValues,
            [name]: newValue
        });

        validateField(name, newValue);
    };

    useEffect(() => {
        validateForm();
    }, [formValues, formErrors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid) {
            setIsModalOpen(true);
            setModalType(editingIndex !== null ? 'submit' : 'submit');
        }
    };

    const handleEdit = (index) => {
        const dataToEdit = formDataArray[index];
        setFormValues({
            firstName: dataToEdit.firstName,
            lastName: dataToEdit.lastName,
            dob: dataToEdit.dob,
            gender: dataToEdit.gender,
            email: dataToEdit.email,
            phone: dataToEdit.phone,
            subject: dataToEdit.subject
        });
        setEditingIndex(index);
        setFormErrors({});
    };

    const handleDelete = (index) => {
        setEditingIndex(index);
        setModalType('delete');
        setIsModalOpen(true);
    };

    const confirmSubmit = () => {
        const dataObject = { ...formValues };
        if (modalType === 'delete') {
            const updatedDataArray = formDataArray.filter((_, i) => i !== editingIndex);
            setFormDataArray(updatedDataArray);
            setEditingIndex(null);
        } else {
            if (editingIndex !== null) {
                const updatedDataArray = [...formDataArray];
                updatedDataArray[editingIndex] = dataObject;
                setFormDataArray(updatedDataArray);
                setEditingIndex(null);
            } else {
                setFormDataArray([...formDataArray, dataObject]);
            }
        }
        setFormValues({
            firstName: '',
            lastName: '',
            dob: '',
            gender: '',
            email: '',
            phone: '',
            subject: ''
        });
        setIsModalOpen(false);
        setFormErrors({});
        setIsFormValid(false); // Reset form validity after submission
    };

    const cancelModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-[#FB2D78] to-[#6D4079]">
            <form id="form" className="w-full max-w-lg bg-white border-1 border-gray-300 p-4" onSubmit={handleSubmit} noValidate>
                <h1 className="text-xl sm:text-xl text-black mb-6 mt-4 font-bold block uppercase tracking-wide text-gray-700">Registration Form</h1>

                {/* Form Fields */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                            First Name
                        </label>
                        <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`} id="first-name" name="firstName" type="text" value={formValues.firstName} onChange={handleChange} placeholder="Jane" />
                        {formErrors.firstName && <p className="text-red-500 text-xs italic">{formErrors.firstName}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                            Last Name
                        </label>
                        <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`} id="last-name" name="lastName" type="text" value={formValues.lastName} onChange={handleChange} placeholder="Doe" />
                        {formErrors.lastName && <p className="text-red-500 text-xs italic">{formErrors.lastName}</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dob">
                            Birthday
                        </label>
                        <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${formErrors.dob ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="dob" name="dob" type="date" value={formValues.dob} onChange={handleChange} />
                        {formErrors.dob && <p className="text-red-500 text-xs italic mt-1">{formErrors.dob}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Gender
                        </label>
                        <div className={`flex items-center mt-2  ${formErrors.gender ? 'border border-red-500 rounded py-2.5 px-2' : ''}`}>
                            <input className="mr-2 leading-tight" type="radio" id="gender-male" name="gender" value="male" checked={formValues.gender === 'male'} onChange={handleChange} />
                            <label className="text-gray-700 text-md mr-12" htmlFor="gender-male">Male</label>

                            <input className="mr-2 leading-tight" type="radio" id="gender-female" name="gender" value="female" checked={formValues.gender === 'female'} onChange={handleChange} />
                            <label className="text-gray-700 text-md" htmlFor="gender-female">Female</label>
                        </div>
                        {formErrors.gender && <p className="text-red-500 text-xs italic mt-1">{formErrors.gender}</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`} id="email" name="email" type="email" value={formValues.email} onChange={handleChange} placeholder="Jane@example.com" />
                        {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`} id="phone" name="phone" type="text" value={formValues.phone} onChange={handleChange} placeholder="1234567890" />
                        {formErrors.phone && <p className="text-red-500 text-xs italic">{formErrors.phone}</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="subject">
                            Subject
                        </label>
                        <div className="relative">
                            <select className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${formErrors.subject ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`} id="subject" name="subject" value={formValues.subject} onChange={handleChange}>
                                <option value="">Choose option</option>
                                <option value="math">Math</option>
                                <option value="science">Science</option>
                                <option value="history">History</option>
                                <option value="literature">Literature</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FaChevronDown className="h-4 w-4" />
                            </div>
                        </div>
                        {formErrors.subject && <p className="text-red-500 text-xs italic">{formErrors.subject}</p>}
                    </div>
                </div>
                <div className="flex mb-6">
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={!isFormValid}
                    >
                        {editingIndex !== null ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>

            {/* Table to show submitted data */}
            {formDataArray.length > 0 ? (
                <Table
                    formDataArray={formDataArray}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    formatDate={formatDate}
                />
            ) : (
                <div className="mt-6 text-center text-lg font-bold text-white">
                    No Records Found
                </div>
            )}
            <Modal
                isOpen={isModalOpen}
                title={modalType === 'delete' ? 'Confirm Deletion' : 'Confirm Submission'}
                message={modalType === 'delete' ? 'Are you sure you want to delete this record?' : 'Are you sure you want to submit this record?'}
                onConfirm={confirmSubmit}
                onCancel={cancelModal}
            />
        </div>
    );
}

export default Form;
