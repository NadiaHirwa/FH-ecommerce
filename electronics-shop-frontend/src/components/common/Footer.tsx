import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">ElectroShop</h3>
                        <p className="text-gray-400 mb-4">
                            Your one-stop destination for premium electronics and gadgets.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2">
                            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Warranty</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start text-gray-400">
                                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                <span>123 Tech Street, Silicon Valley, CA 94000</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                                <span>support@electroshop.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} ElectroShop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
