import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './BookDetails.css';

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/book/${isbn}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, [isbn]);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="book-details-container">
        <div className="book-detail-frame">
          <img src={book.cover} alt={book.judul} className="book-detail-cover" />
          <div className="book-detail-info">
            <h1>{book.judul}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Penerbit:</strong> {book.penerbit}</p>
            <p><strong>Deskripsi:</strong> {book.deskripsi}</p>
            <p><strong>Jumlah:</strong> {book.jumlah}</p>
          </div>
        </div>
      </div>

      <div className="book-review-container">
        <div className="book-detail-frame">
          <h1>Review</h1>
          <p>{book.review}</p>
        </div>
      </div>
    </div>

    
    

    
    
  );
};

export default BookDetail;
