import React from 'react';
import fb from '../assets/fb.png';
import ins from '../assets/ins.png';
import twt from '../assets/twt.png';
import li from '../assets/li.png';
import logo from '../assets/logo2.png';
import visa from '../assets/visa.png';
import union from '../assets/unionPay.png';
import master from '../assets/Mastercardicon.png';
import doc from '../assets/DocuSign.png';
import layer from '../assets/layer.png';
import mercury from '../assets/mercury.png';
import nImage from '../assets/nImage.png';
import aws from '../assets/AWS.png';
import stripe from '../assets/Stripeimg.png';




const Footer = () => {
    return (
        <footer className="footer">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 px-12">
                        <a href="https://workfall.com/" className="flex items-center">
                            <img src={logo} className="footer-logo me-3" alt="workfall Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white footer-logo-text">
                                Workfall
                            </span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-1 sm:gap-6 sm:grid-cols-3 mx-14">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900  dark:text-white footer-heading">
                                Quick Links
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium footer-text">
                                <li className="mb-4">
                                    <a href="https://workfall.com/" className="footer-link footer-link-hover">Blogs</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="footer-link footer-link-hover">Stories</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900  dark:text-white footer-heading">
                                Contact us
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium footer-text">
                                <li className="mb-4">
                                    <a href="https://github.com/themesberg/workfall" className="footer-link footer-link-hover">
                                        contact@workfall.com
                                    </a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" className="footer-link footer-link-hover">+1 650 900 2022</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900  dark:text-white footer-heading">
                                Follow us on:
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <ul className="flex  space-x-2">
                                        <li>
                                            <img src={fb} alt="Facebook" className="footer-icon" />
                                        </li>
                                        <li>
                                            <img src={twt} alt="Twitter" className="footer-icon" />
                                        </li>
                                        <li>
                                            <img src={ins} alt="Instagram" className="footer-icon" />
                                        </li>
                                        <li>
                                            <img src={li} alt="LinkedIn" className="footer-icon" />
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 footer-hr" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between footer-text footer">
                    <div className="flex space-x-4 px-12">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            <a href="https://workfall.com/" className="footer-link footer-link-hover">Privacy Policy</a>
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            <a href="https://workfall.com/" className="footer-link footer-link-hover">Cookies Policy</a>
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            <a href="https://workfall.com/" className="footer-link footer-link-hover">Terms of Service</a>
                        </span>
                    </div>
                    <div className="flex justify-center flex-grow mx-11">
                        <span className="text-sm text-gray-500 dark:text-gray-400 footer-copyright">
                            © 2024 <a href="https://workfall.com/" className="footer-link footer-link-hover">Workfall, Inc</a>
                        </span>
                    </div>
                    <div className="flex my-6 mx-10 space-x-1 flex-wrap justify-center">
                        <img src={visa} alt="Visa" className="footer-icon" />
                        <img src={master} alt="Mastercard" className="footer-icon" />
                        <img src={layer} alt="Layer" className="footer-icon" />
                        <img src={union} alt="UnionPay" className="footer-icon" />
                        <img src={stripe} alt="Stripe" className="footer-icon" />
                        <img src={nImage} alt="Image" className="footer-icon" />
                        <img src={mercury} alt="Mercury" className="footer-icon" />
                        <img src={doc} alt="DocuSign" className="footer-icon" />
                        <img src={aws} alt="AWS" className="footer-icon" />
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
