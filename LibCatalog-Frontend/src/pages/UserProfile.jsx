import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.css';
import Navbar from '../components/Navbar';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [readLaterBooks, setReadLaterBooks] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                let storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    const userProfileResponse = await fetch(`http://localhost:5000/user/${parsedUser.id_user}`);
                    const userProfileData = await userProfileResponse.json();
                    setUserProfile(userProfileData);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                toast.error('Failed to fetch user profile.');
            }
        };

        const fetchBorrowedBooks = async () => {
            try {
                let storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    const borrowedBooksResponse = await fetch(`http://localhost:5000/borrow/${parsedUser.id_user}`);
                    const borrowedBooksData = await borrowedBooksResponse.json();
                    
                    // Fetch additional book information using ISBN
                    const updatedBorrowedBooks = await Promise.all(borrowedBooksData.map(async (book) => {
                        const bookInfoResponse = await fetch(`http://localhost:5000/book/${book.isbn}`);
                        const bookInfoData = await bookInfoResponse.json();
                        return { ...book, judul: bookInfoData.judul, deskripsi: bookInfoData.deskripsi };
                    }));
                    
                    setBorrowedBooks(updatedBorrowedBooks);
                }
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
                toast.error('Failed to fetch borrowed books.');
            }
        };

        const fetchReadLaterBooks = async () => {
            try {
                let storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    const readLaterResponse = await fetch(`http://localhost:5000/readlater/${parsedUser.id_user}`);
                    const readLaterData = await readLaterResponse.json();
                    
                    // Fetch additional book information using ISBN
                    const updatedReadLaterBooks = await Promise.all(readLaterData.map(async (book) => {
                        const bookInfoResponse = await fetch(`http://localhost:5000/book/${book.isbn}`);
                        const bookInfoData = await bookInfoResponse.json();
                        return { ...book, judul: bookInfoData.judul, deskripsi: bookInfoData.deskripsi };
                    }));
                    
                    setReadLaterBooks(updatedReadLaterBooks);
                }
            } catch (error) {
                console.error('Error fetching read later books:', error);
                toast.error('Failed to fetch read later books.');
            }
        };

        fetchUserProfile();
        fetchBorrowedBooks();
        fetchReadLaterBooks();
    }, []);
    
    const handleRemoveReadLater = async (id_read_later) => {
        try {
            const response = await fetch(`http://localhost:5000/readlater/${id_read_later}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setReadLaterBooks((prevBooks) => prevBooks.filter((buku) => buku.id_read_later !== id_read_later));
                toast.success('Book removed from read later list.');
            } else {
                toast.error('Failed to remove book from read later list.');
            }
        } catch (error) {
            console.error('Error removing book from read later list:', error);
            toast.error('Failed to remove book from read later list.');
        }
    }

    if (!userProfile) {
        return <p>Loading user profile...</p>;
    }

    return (
        
        <div className="user-profile-container">
            <div className="user-info">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Avatar" />
                <p><strong>Username:</strong> {userProfile.username}</p>
                <p><strong>Name:</strong> {userProfile.nama}</p>
            </div>
            <div className="books-grid">
                <div className="books-section">
                    <h3>Borrowed Books</h3>
                    <div className="card-container">
                        {borrowedBooks.map((buku, index) => (
                            <div key={index} className="card">
                                <p><strong>Title:</strong> {buku.judul}</p>
                                <p><strong>ISBN:</strong> {buku.isbn}</p>
                                <p><strong>Return Date:</strong> {buku.deadline}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="books-section">
                    <h3>Read Later</h3>
                    <div className="card-container">
                        {readLaterBooks.map((buku, index) => (
                            <div key={index} className="card">
                                <p><strong>Title:</strong> {buku.judul}</p>
                                <p><strong>ISBN:</strong> {buku.isbn}</p>
                                <p><strong>Description:</strong> {buku.deskripsi}</p>
                                <button className="return-button" onClick={() => handleRemoveReadLater(buku.id_read_later)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserProfile; 