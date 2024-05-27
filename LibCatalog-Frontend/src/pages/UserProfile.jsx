import './UserProfile.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [user, setUser] = useState({
        fullName: "Orang",
        username: "rang.orang",
        profilePicture: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
        bookTransactions: [
            { transactionId: 1, isbn: "1234567890", title: "The Catcher in the Rye", author: "J.D. Salinger", returnDate: "2024-06-01", status: "Sedang Dipinjam" },
            { transactionId: 2, isbn: "0987654321", title: "1984", author: "George Orwell", returnDate: "2024-05-15", status: "Sudah Dikembalikan" },
        ],
        readLaterBooks: [
            { isbn: "2233445566", title: "Brave New World", description: "A dystopian social science fiction novel and cautionary tale, written by the English author Aldous Huxley.", author: "Aldous Huxley" },
            { isbn: "3344556677", title: "Moby Dick", description: "A novel by Herman Melville, in which Captain Ahab seeks vengeance against a white whale.", author: "Herman Melville" },
        ],
    });

    /*const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [readLaterBooks, setReadLaterBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:5000/user');
                setUser(userResponse.data);

                const transactionsResponse = await axios.get('http://localhost:5000/borrowBook');
                setTransactions(transactionsResponse.data);

                const readLaterResponse = await axios.get('http://localhost:5000/readLater');
                setReadLaterBooks(readLaterResponse.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }*/

    const handleReturnBook = (transactionId) => {
        const updatedTransactions = user.bookTransactions.map(transaction =>
            transaction.transactionId === transactionId
                ? { ...transaction, status: "Sudah Dikembalikan" }
                : transaction
        );
        setUser({ ...user, bookTransactions: updatedTransactions });
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <div className="user-info">
                <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Username:</strong> {user.username}</p>
            </div>
            <div className="books-grid">
                <div className="books-section">
                    <h3>Book Transactions</h3>
                    <div className="card-container">
                        {user.bookTransactions.map((transaction, index) => (
                            <div key={index} className="card">
                                <p><strong>Title:</strong> {transaction.title}</p>
                                <p><strong>ISBN:</strong> {transaction.isbn}</p>
                                <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                                <p><strong>Return Date:</strong> {transaction.returnDate}</p>
                                <p className={`status ${transaction.status === 'Sedang Dipinjam' ? 'borrowed' : 'returned'}`}>
                                    {transaction.status}
                                </p>
                                {transaction.status === 'Sedang Dipinjam' && (
                                    <button className="return-button" onClick={() => handleReturnBook(transaction.transactionId)}>
                                        Return
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="books-section">
                    <h3>Read Later</h3>
                    <div className="card-container">
                        {user.readLaterBooks.map((book, index) => (
                            <div key={index} className="card">
                                <p><strong>Title:</strong> {book.title}</p>
                                <p><strong>ISBN:</strong> {book.isbn}</p>
                                <p><strong>Description:</strong> {book.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;