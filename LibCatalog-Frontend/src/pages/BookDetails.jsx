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
  const [borrowId, setBorrowId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let storedUser = localStorage.getItem("user")
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // cari buku yang sedang di
        fetch(`http://localhost:5000/borrow/${parsedUser.id_user}/${isbn}`)
        .then((response) => response.json())
        .then((data) => {
          if(data.message == null){
            setIsBorrowed(true);
            setBorrowId(data.id_peminjaman);
          } else {
            setIsBorrowed(false);
          }
        })
        .catch((err) => console.log(err));
        
        initializeBook();
    }    
  }, []);

  const initializeBook = () => {
    fetch(`http://localhost:5000/book/${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((err) => console.log(err));
  };

  const handleBorrow = () => {
    if (!user) {
      toast.error('Please log in to borrow a book.');
      return;
    }

    fetch(`http://localhost:5000/borrow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user : user.id_user, isbn }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        if (data.message === "Berhasil Meminjam Buku") {
          setIsBorrowed(true);
          setBorrowId(data.data);
          initializeBook();
          toast.success('Buku berhasil dipinjam!');
        } 
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Gagal meminjam buku!');
      });
  };

  const handleReturn = () => {
    if (borrowId == null) {
      console.log(borrowId);
      toast.error('No borrowed book found.');
      return;
    }

    fetch(`http://localhost:5000/return/${borrowId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'sudah dikembalikan', id_peminjaman: borrowId, isbn }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === "Berhasil Mengembalikan Buku") {
          setIsBorrowed(false);
          toast.success('Buku berhasil dikembalikan!');
          // setBook((prevBook) => ({
          //   ...prevBook,
          //   status: 'sudah dikembalikan',
          // }));
          initializeBook();
        } else {
          toast.error('Gagal mengembalikan buku!');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Gagal mengembalikan buku!');
      });
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
            
            {!isBorrowed  ? (
                <button onClick={handleBorrow}>Borrow Book</button>
              ) : (
                <button onClick={handleReturn}>Return Book</button>
              )
            }

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
