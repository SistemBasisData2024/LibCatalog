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
  const [borrowId, setborrowId] = useState(null);  
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("user")
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
    setUserId(user.id_user);
  }, []);


  useEffect(() => {
    // setUserId(`userId=${req.session.user.id_user}`);  
    // const loggedInUser = localStorage.getItem("user");
    // setUserId(JSON.parse(loggedInUser).id_user);
    // const userId = document.cookie.split(';').find(c => c.startsWith('id_user=')).split('=')[1];'
    const loggedInUser = localStorage.getItem("user");
    setUserId(JSON.parse(loggedInUser).id_user);
  
    fetch(`http://localhost:5000/book/${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
          fetch(`http://localhost:5000/borrow/${userId}/${isbn}`)
          .then((response) => response.json()) 
          .then((data) => {
            if ( !data ) {
              setIsBorrowed(true);
              setIsReturned(false);
              setborrowId(data.id_peminjaman);
            } 
            if ( data ) {
              setIsBorrowed(false);
              setIsReturned(true);
            }
          })
      })
      .catch((err) => console.log(err));
  }, [isbn]);


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
          setIsReturned(false);
          setborrowId(data.data); // Mengatur borrowId dengan id_peminjaman dari respons
          toast.success('Buku berhasil dipinjam!');
        } else {
          toast.error('Gagal meminjam buku!');
        }
      })
      .catch((err) => console.log(err));
};

const handleReturn = () => {
  console.log("borrowId:", borrowId); // Tambahkan ini untuk memeriksa borrowId
  fetch(`http://localhost:5000/return/${borrowId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, id_peminjaman: borrowId, isbn}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === "Berhasil Mengembalikan Buku") {
        setIsReturned(true);
        setIsBorrowed(false);
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
            
            {!isBorrowed  ? (
                <button onClick={handleBorrow}>Borrow Book</button>
              ) : (
                <button onClick={handleReturn}>Return Book</button>
              )
            }

            {/* {!isBorrowed && <button onClick={handleBorrow}>Borrow Book</button>}
            {isBorrowed && !isReturned && <button onClick={handleReturn}>Return Book</button>} */}
          
          
          
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