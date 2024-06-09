import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookList.css';

const BookList = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [readLaterList, setReadLaterList] = useState([]);
    const [readLaterListID, setReadLaterListID] = useState([]);
    const [userOrAdmin, setUserOrAdmin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        fetchAllBooks();

        let storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserOrAdmin(parsedUser);
            setIsAdmin(false);

            fetch(`http://localhost:5000/readlater/${parsedUser.id_user}`)
                .then((response) => response.json())
                .then((data) => setReadLaterListID(data))
                .catch((err) => console.log(err));
        }

        let storedAdmin = localStorage.getItem("admin")
        if (storedAdmin) {
            const parsedAdmin = JSON.parse(storedAdmin);
            setUserOrAdmin(parsedAdmin);
            setIsAdmin(true);
        }
    }, []);

    const fetchAllBooks = () => {
        fetch("http://localhost:5000/allbooks")
            .then((response) => response.json())
            .then((data) => setBackendData(data))
            .catch((err) => console.log(err));
    };

    const handleGenreClick = (genre) => {
        fetch(`http://localhost:5000/genre/${genre}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Genre ${genre} not found`);
                }
                return response.json();
            })
            .then((data) => {
                setBackendData(data)
                setSelectedGenre(genre);
            })
            .catch((err) => {
                toast.error(`Genre ${genre} is empty. Redirecting to All Books...`);      
                fetchAllBooks();
                setSelectedGenre('');
        });
    };


    const addToReadLater = (isbn) => {
        fetch(`http://localhost:5000/readlater`, {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id_user: userOrAdmin.id_user, isbn }) 
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add to Read Later list");
            }
            return response.json();
        })
        .then((data) => {
            setReadLaterList([...readLaterList, data]);
            setReadLaterListID([...readLaterListID, { id_user: userOrAdmin.id_user, isbn }]);
            console.log(data);
            toast.success(`Added to Read Later list`);
        })
        .catch((err) => toast.error(err.message));
    };

    return (
        <div>
            <ToastContainer />
            <h1 className='text-center text-[23px] text-[black] font-[bold] mt-5'>WELCOME ADMINISTRATOR</h1>
            <p className='text-center text-base text-[black] mb-5'>This Lorem Ipsum was written manually Ohio sigma fanum tax 1550s</p>
            
            <div className="flex justify-center items-center gap-[15px]">
                <button className={`genreButton ${selectedGenre === '' ? 'active' : ''}`} 
                    onClick={() => {
                        fetchAllBooks()
                        setSelectedGenre('')}
                }>
                    All Books
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'fiction' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('fiction')}
                >
                    Fiction
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'romance' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('romance')}
                >
                    Romance
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'novel' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('novel')}
                >
                    Novel
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'science' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('science')}
                >
                    Science
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'science fiction' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('science fiction')}
                >
                    Science-fiction
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'motivation' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('motivation')}
                >
                    Motivation
                </button>
            </div>

            <div className='book-list'>
                {backendData.length > 0 ? (
                    backendData.map((book, index) => (
                        <div key={index} className='book-item'>
                            <div>
                                {!isAdmin ? (
                                    <Link to={`/book/${book.isbn}`} className='book-link'>
                                    <img src={book.cover} alt={book.judul} className='book-cover' />
                                    <div className='book-info'>
                                        <h2 className='book-title'>{book.judul}</h2>
                                        <p className='book-description'>{book.deskripsi}</p>
                                    </div>
                                    </Link>
                                ) : (
                                    <div>
                                        <img src={book.cover} alt={book.judul} className='book-cover' />
                                        <div className='book-info'>
                                            <h2 className='book-title'>{book.judul}</h2>
                                            <p className='book-description'>{book.deskripsi}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!isAdmin && (
                                <button 
                                    className='book-read-later' 
                                    disabled={readLaterListID.some(item => item.isbn === book.isbn && item.id_user === userOrAdmin.id_user)} 
                                    onClick={() => (userOrAdmin ? addToReadLater(book.isbn) : toast.error('Please login to add to Read Later list'))}
                                >
                                    🕮
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Loading books...</p>
                )}
            </div>
        </div>
    );
};

export default BookList;
