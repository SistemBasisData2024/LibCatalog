import React from 'react';
import Navbar from '../components/Navbar';
import TopFive from '../components/TopFive';
import BookList from '../components/BookList';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    useEffect(() => {
        fetch("http://localhost:5000/readlater")
            .then((response) => response.json())
            .then((data) => setReadLaterList(data))
            .catch((err) => console.log(err));
    }, []);

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
        <div className="bg-[#7096D1] min-h-screen">
            <ToastContainer />
            <Navbar />
            <TopFive />
            <BookList />

        </div>
    );
};

export default Home;
