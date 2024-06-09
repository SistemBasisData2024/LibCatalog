import React from 'react';
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Admin.css';
import AddBookModal from '../components/AddBookModal';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [userOrAdmin, setUserOrAdmin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let storedAdmin = localStorage.getItem("admin")
        if (storedAdmin) {
            const parsedAdmin = JSON.parse(storedAdmin);
            setUserOrAdmin(parsedAdmin);
        }
    }, []);

    const handleAddBook = (newBook) => {
        // Handle book addition logic here, such as making a POST request to your backend API
        toast.success("Book added successfully!");
    };

    return (
        <div className="bg-[#7096D1] min-h-screen">
            <ToastContainer />
            <Navbar />

            <div className="book-review-container">
                <div className="book-detail-frame">
                <h1 className='text-center'>Administrator Page</h1>
                    <div className="user-info">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Avatar" />
                        {userOrAdmin && (
                            <>
                                <p><strong>Username:</strong> {userOrAdmin.username}</p>
                                <p><strong>Name:</strong> {userOrAdmin.nama}</p>
                            </>
                        )}
                    </div>

                    <button onClick={() => setIsModalOpen(true)}>Add New Book</button>

                    <AddBookModal 
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddBook}
                    />
                </div>
            </div>

                
                <BookList />
            <div>

            </div>
            
        </div>
    );
};

export default Admin;
