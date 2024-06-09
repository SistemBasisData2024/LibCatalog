import React from 'react';
import Navbar from '../components/Navbar';
import TopFive from '../components/TopFive';
import BookList from '../components/BookList';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Admin.css';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    // ihh kosongnya

    return (
        <div className="bg-[#7096D1] min-h-screen">
            <ToastContainer />
            <Navbar />

            <div className="book-review-container">
                <div className="book-detail-frame">
                <h1>Review</h1>
                {/* <p>{book.review}</p> */}
                </div>
            </div>

            <BookList />
        </div>
    );
};

export default Home;
