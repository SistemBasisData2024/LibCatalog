import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookDetails.css';

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [isReturned, setIsReturned] = useState(false);
  const [loanId, setLoanId] = useState(null);  


  useEffect(() => {
    fetch(`http://localhost:5000/book/${isbn}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, [isbn]);

   const handleBorrow = () => {
    const userId = 1;

    fetch(`http://localhost:5000/borrow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user: userId, isbn }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsBorrowed(true);
        setLoanId(data.id_peminjaman);  
        toast.success('Buku berhasil dipinjam!');
      })
      .catch((err) => console.log(err));
  };

  const handleReturn = () => {
    const loanId = 60;
    fetch(`http://localhost:5000/return/${loanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_peminjaman: loanId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsReturned(true);
        toast.success('Buku berhasil dikembalikan!');
      })
      .catch((err) => console.log(err));
  };

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div>
      <Navbar />
      <ToastContainer />
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
            {!isBorrowed && <button onClick={handleBorrow}>Borrow Book</button>}
            {isBorrowed && !isReturned && <button onClick={handleReturn}>Return Book</button>}
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
