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
  const [userId, setUserId] = useState(null);
  const [isBookBorrowed, setIsBookBorrowed] = useState(false);


  useEffect(() => {
    const loggedInUser = 1;
    setUserId(loggedInUser);
    fetch(`http://localhost:5000/book/${isbn}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, [isbn]);

  useEffect (() => {
    if (book && book.status === 'sedang dipinjam') {
      setIsBookBorrowed(true);
      setLoanId(book.id_peminjaman);
    }
  }, [book]);


  const handleBorrow = () => {
    fetch(`http://localhost:5000/borrow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user: userId, isbn }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        if (data.message === "Berhasil Meminjam Buku") {
          setIsBorrowed(true);
          setLoanId(data.data); // Mengatur loanId dengan id_peminjaman dari respons
          toast.success('Buku berhasil dipinjam!');
        } else {
          toast.error('Gagal meminjam buku!');
        }
      })
      .catch((err) => console.log(err));
};
  
const handleReturn = () => {
  // Pastikan loanId tidak undefined di sini
  console.log("loanId:", loanId); // Tambahkan ini untuk memeriksa loanId
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
      if (data.message === "Berhasil Mengembalikan Buku") {
        setIsReturned(true);
        toast.success('Buku berhasil dikembalikan!');
        // Perbarui status peminjaman di state aplikasi frontend
        setBook((prevBook) => ({
          ...prevBook,
          status: 'sudah dikembalikan',
        }));
      } else {
        toast.error('Gagal mengembalikan buku!');
      }
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