import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const TopFive = () => {
    const [topBooks, setTopBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/home/top")
            .then((response) => response.json())
            .then((data) => setTopBooks(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % topBooks.length);
        }, 5000); 

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
        <div className="w-full overflow-hidden relative h-92 bg-[#fbfff1] border-t-2 border-b-2 border-gray-800">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {topBooks.length > 0 ? (
                    topBooks.map((book, index) => (
                        <Link to={`/book/${book.isbn}`} key={index} className='min-w-full box-border p-5 text-center flex items-center justify-center'>
                            <div className="flex items-center mt-2.5">
                                <img src={book.cover} alt={book.judul} className="shadow-lg max-w-xs h-auto mr-10" />
                                <div className="text-black text-left">
                                    <h2 className="text-2xl font-bold">#{index+1}</h2>
                                    <h2 className="text-2xl font-bold">{book.judul}</h2>
                                    <p className="text-lg mt-2.5 max-w-2xl">{book.deskripsi}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="loading-message">Loading top books...</p>
                )}
            </div>

            <div className="flex justify-center items-center">
                <button onClick={handlePrevious} className="text-black px-2.5 text-2xl mx-1 mb-2 transition-transform duration-200 ease-in-out transform hover:scale-110">←</button>
                {topBooks.slice(0, 5).map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleJumpToIndex(index)} 
                        className={`bg-black text-black p-1.5 text-center rounded-full transition-transform duration-200 ease-in-out mx-2 ${index === currentIndex ? 'transform scale-125' : ''}`}
                    ></button>
                ))}
                <button onClick={handleNext} className="text-black px-2.5 text-2xl mx-1 mb-2 transition-transform duration-200 ease-in-out transform hover:scale-110">→</button>
            </div>
        </div>
    );
};

export default TopFive;
