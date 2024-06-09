import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';
import AddBookModal from '../components/AddBookModal';

const Admin = () => {
    const [userOrAdmin, setUserOrAdmin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        let storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            const parsedAdmin = JSON.parse(storedAdmin);
            setUserOrAdmin(parsedAdmin);
        }
    }, []);

    const handleAddBook = (newBook) => {
        const url = selectedBook
            ? `http://localhost:5000/book/${newBook.isbn}`
            : 'http://localhost:5000/book/';
        const method = selectedBook ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    toast.success(selectedBook ? 'Book updated successfully!' : 'Book added successfully!');
                    setSelectedBook(null);
                } else {
                    toast.error('Failed to save book!');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Failed to save book!');
            });
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
                        onRequestClose={() => {
                            setIsModalOpen(false);
                            setSelectedBook(null);
                        }}
                        onSubmit={handleAddBook}
                        selectedBook={selectedBook}
                    />
                </div>
            </div>
            <BookList />
        </div>
    );
};

export default Admin;
