import React, { useState } from 'react';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS58NfJoUEBSrVT_0-ldugoxm0zbw1wGznbNfI5pqh8HA&s" alt="Library Logo" className="w-12 h-12 rounded-full" />
                    <div className="text-xl font-semibold text-white">Library</div>
                </div>
                <ul className="flex space-x-8"> {/* Ubah space-x-4 menjadi space-x-8 untuk menambahkan jarak */}
                    <li><a href="#" className="text-white">Home</a></li>
                    <li><a href="#" className="text-white">Features</a></li>
                    <li><a href="#" className="text-white">Pages</a></li>
                    <li><a href="#" className="text-white">Shop</a></li>
                    <li><a href="#" className="text-white">Event</a></li>
                    <li><a href="#" className="text-white">Blog</a></li>
                </ul>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center text-white focus:outline-none"
                        >
                            <img className="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS0Eqzjf43Ylw0MckYVzE_sHsAieZCNl7QEz6b1j9mLw&s" alt="User Avatar" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">Adolf Hitler</span>
                                    <span className="block text-sm text-gray-500 truncate">Hitler@gmail.com</span>
                                </div>
                                <ul>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
