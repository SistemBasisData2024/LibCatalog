import './Home.css';
import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Route, Router } from "react-router-dom";

const Home = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [topBooks, setTopBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [readLaterList, setReadLaterList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/home")
            .then((response) => response.json())
            .then((data) => setBackendData(data))
            .catch((err) => console.log(err));

        fetch("http://localhost:5000/home/top")
            .then((response) => response.json())
            .then((data) => setTopBooks(data))
            .catch((err) => console.log(err));

        fetch("http://localhost:5000/readlater")
            .then((response) => response.json())
            .then((data) => setReadLaterList(data))
            .catch((err) => console.log(err));
    }, []);
    
    // Container Top Books
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % topBooks.length);
        }, 5000); // Change book every 3 seconds

        return () => clearInterval(interval);
    }, [topBooks.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topBooks.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + topBooks.length) % topBooks.length);
    };

    const handleJumpToIndex = (index) => {
        setCurrentIndex(index);
    };

    const fetchBooksByGenre = (genre) => {
        fetch(`http://localhost:5000/home/genre/${genre}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Genre ${genre} not found`);
                    
                }
                return response.json();
            })
            .then((data) => setBackendData(data))
            .catch((err) => {
                toast.error(`Genre ${genre} is empty. Redirecting to All Books...`);
                fetch("http://localhost:5000/home")
                    .then((response) => response.json())
                    .then((data) => {
                        setBackendData(data);
                        setSelectedGenre('');
                    })
                    .catch((err) => console.log(err));
            });
    };

    const handleGenreClick = (genre) => {
        fetchBooksByGenre(genre);
        setSelectedGenre(genre);
    };

    const addToReadLater = (isbn) => {
        fetch("http://localhost:5000/readlater", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id_user: 1, isbn }) // Replace 1 with actual user ID
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add to Read Later list");
            }
            return response.json();
        })
        .then((data) => {
            setReadLaterList((prevList) => [...prevList, { isbn }]);
            toast.success("Added to Read Later list");
        })
        .catch((err) => toast.error(err.message));
    };

    return (
        <div className="home-container">
            <ToastContainer />
            <Navbar />

            <div className="top-books-container">
                <div
                    className="top-books-slider"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                {topBooks.length > 0 ? (
                    topBooks.map((book, index) => (
                        <Link to={`/book/${book.isbn}`} key={index} className='top-book'>
                            <div  className="top-book-content">
                                <img src={book.cover} alt={book.judul} className="top-book-cover" />
                                <div className="top-book-info">
                                    <h2 className="top-book-title">#{index+1}</h2>
                                    <h2 className="top-book-title">{book.judul}</h2>
                                    <p className="top-book-description">{book.deskripsi}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="loading-message">Loading top books...</p>
                )}
                </div>

                <div className="navigation-buttons">
                    <button onClick={handlePrevious} className="nav-button-arrow">←</button>
                    {topBooks.slice(0, 5).map((_, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleJumpToIndex(index)} 
                            className={`nav-button ${index === currentIndex ? 'active' : ''}`}
                        >
                        </button>
                    ))}
                    <button onClick={handleNext} className="nav-button-arrow">→</button>
                </div>
            </div>

            <h1 className='allBooks'>BOOK CHOICES</h1>
            <p className='allBooks'>This Lorem Ipsum was written manually Ohio sigma fanum tax 1550s</p>
            
            <div class="button-container">
                <button className={`genreButton ${selectedGenre === '' ? 'active' : ''}`} 
                    onClick={() => 
                        fetch("http://localhost:5000/home")
                            .then(response => response.json())
                            .then(data => { 
                                setBackendData(data); 
                                setSelectedGenre(''); 
                            })}>
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
                            <Link to={`/book/${book.isbn}`} className='book-link'>
                                <img src={book.cover} alt={book.judul} className='book-cover' />
                                <div className='book-info'>
                                    <h2 className='book-title'>{book.judul}</h2>
                                    <p className='book-description'>{book.deskripsi}</p>
                                </div>
                            </Link>
                            <button 
                                className='book-read-later' 
                                disabled={readLaterList.some(item => item.isbn === book.isbn)} 
                                onClick={() => addToReadLater(book.isbn)}
                            >
                                🕮
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading books...</p>
                )}
            </div>

        </div>
    );
};

export default Home;
