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
        }, 3000); // Change book every 3 seconds

        return () => clearInterval(interval);
    }, [topBooks.length]);

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
                            <img src={book.cover} alt={book.judul} />
                            <div className="book-info">
                                <h2>{book.judul}</h2>
                                <p>{book.deskripsi}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-message">Loading top books...</p>
                )}
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
                                <button className='book-read-later'>📅</button>
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
