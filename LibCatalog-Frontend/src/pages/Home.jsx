import './Home.css';
import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { Link, Route, Router } from "react-router-dom";

const Home = () => {
    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:5000/home")
        .then((response) => response.json())
        .then((data) => setBackendData(data))
        .catch((err) => console.log(err));
    }, []);
    
    return (
        <div>
            <Navbar />
            <h1 className='allBooks'>BOOK CHOICES</h1>
            <p className='allBooks'>This Lorem Ipsum was written manually Ohio sigma fanum tax 1550s</p>
            
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
