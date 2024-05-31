import './Home.css';
import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { Link, Route, Router } from "react-router-dom";

const Home = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [topBooks, setTopBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/home")
            .then((response) => response.json())
            .then((data) => setBackendData(data))
            .catch((err) => console.log(err));

        fetch("http://localhost:5000/home/top")
            .then((response) => response.json())
            .then((data) => setTopBooks(data))
            .catch((err) => console.log(err));
    }, []);
    
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

    return (
        <div>
            <Navbar />

            <div className="top-books-container">
                <div
                    className="top-books-slider"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                {topBooks.length > 0 ? (
                    topBooks.map((book, index) => (
                        <div key={index} className="top-book">
                                <div className="top-book-content">
                                    <img src={book.cover} alt={book.judul} className="top-book-cover" />
                                    <div className="top-book-info">
                                        <h2 className="top-book-title">{book.judul}</h2>
                                        <p className="top-book-description">{book.deskripsi}</p>
                                    </div>
                                </div>
                            </div>
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
                <button className='genreButton'>All Books</button>
                <button className='genreButton'>Fiction</button>
                <button className='genreButton'>Romance</button>
                <button className='genreButton'>Novel</button>
                <button className='genreButton'>Science</button>
                <button className='genreButton'>Science-fiction</button>
                <button className='genreButton'>Motivation</button>
            </div>

            <div className='book-list'>
                {backendData.length > 0 ? (
                    backendData.map((book, index) => (
                        <div key={index} className='book-item'>
                            <img src={book.cover} alt={book.judul} className='book-cover' />
                            <div className='book-info'>
                                <h2 className='book-title'>{book.judul}</h2>
                                <p className='book-description'>{book.deskripsi}</p>
                                <button className='book-read-later'>🕮</button>
                                {/* You can add more book details here */}
                            </div>
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
