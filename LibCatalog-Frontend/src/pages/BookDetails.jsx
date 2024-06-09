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
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', ulasan: '' });

  useEffect(() => {
    let storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Check if the book is borrowed by the user
      fetch(`http://localhost:5000/borrow/${parsedUser.id_user}/${isbn}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message == null) {
            setIsBorrowed(true);
            setBorrowId(data.id_peminjaman);
          } else {
            setIsBorrowed(false);
          }
        })
        .catch((err) => console.log(err));
    }
    initializeBook();
    fetchReviews();
  }, []);

  const initializeBook = () => {
    fetch(`http://localhost:5000/book/${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchReviews = () => {
    fetch(`http://localhost:5000/review/${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
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
      body: JSON.stringify({ id_user: user.id_user, isbn }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
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
        if (data.message === "Berhasil Mengembalikan Buku") {
          setIsBorrowed(false);
          toast.success('Buku berhasil dikembalikan!');
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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to submit a review.');
      return;
    }

    fetch(`http://localhost:5000/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_user: user.id_user, isbn, ...newReview }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          fetchReviews();
          toast.success('Review added successfully!');
          setNewReview({ rating: '', ulasan: '' });
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Failed to add review.');
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

            {!isBorrowed ? (
              <button onClick={handleBorrow}>Borrow Book</button>
            ) : (
              <button onClick={handleReturn}>Return Book</button>
            )}
          </div>
        </div>
      </div>

      <div className="book-review-container">
        <div className="reviews-section">
          <h1>Review</h1>
          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Ulasan:</strong> {review.ulasan}</p>
              </div>
            ))}
          </div>
        </div>
        {user && (
          <div className="add-review">
            <h2>Add Your Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <input
                type="number"
                name="rating"
                max="5"
                min="1"
                value={newReview.rating}
                onChange={handleReviewChange}
                placeholder="Rating (1-5)"
                required
              />
              <textarea
                name="ulasan"
                value={newReview.ulasan}
                onChange={handleReviewChange}
                placeholder="Write your review here..."
                required
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
