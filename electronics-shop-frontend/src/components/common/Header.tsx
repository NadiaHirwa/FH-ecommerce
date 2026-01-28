import React from 'react';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
// import { Button } from '../ui/Button'; // Assuming we might use it later

export const Header: React.FC = () => {
    const { items } = useCart();
    const cartItemCount = items.reduce((sum, item) => sum + item.cartQuantity, 0);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container-custom h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center">
                    ElectroShop
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
                    <Link to="/shop" className="text-gray-600 hover:text-primary transition-colors">Shop</Link>
                    <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">Categories</Link>
                    <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-600 hover:text-primary transition-colors" aria-label="Search">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link to="/cart" className="p-2 text-gray-600 hover:text-primary transition-colors relative" aria-label="Cart">
                        <ShoppingCart className="w-5 h-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/profile" className="p-2 text-gray-600 hover:text-primary transition-colors" aria-label="Account">
                        <User className="w-5 h-5" />
                    </Link>

                    {/* Mobile Menu Button - Placeholder for functionality */}
                    <button className="md:hidden p-2 text-gray-600 hover:text-primary" aria-label="Menu">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};
