import React, { useState, useEffect } from 'react';
import './AddBookModal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBookModal = ({ isOpen, onRequestClose, onSubmit, selectedBook }) => {
    const [book, setBook] = useState({
        isbn: '',
        cover: '',
        judul: '',
        deskripsi: '',
        author: '',
        genre: '',
        penerbit: '',
        jumlah: ''
    });

    const genres = ['fiction', 'romance', 'novel', 'science', 'science fiction', 'motivation'];

    useEffect(() => {
        if (selectedBook) {
            setBook(selectedBook);
        } else {
            setBook({
                isbn: '',
                cover: '',
                judul: '',
                deskripsi: '',
                author: '',
                genre: '',
                penerbit: '',
                jumlah: ''
            });
        }
    }, [selectedBook]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'isbn' && !/^\d*$/.test(value)) {
            return; // Prevent non-numeric input for ISBN
        }
        if (name === 'jumlah' && value < 0) {
            return; // Prevent negative input for jumlah
        }
        setBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!genres.includes(book.genre)) {
            toast.error('Invalid genre selected!');
            return;
        }
        onSubmit(book);
        onRequestClose();
    };

    const handleDelete = () => {
        fetch(`http://localhost:5000/book/${book.isbn}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'Book deleted successfully!') {
                    toast.success('Book deleted successfully!');
                    onRequestClose();
                } else {
                    toast.error('Failed to delete book!');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Failed to delete book!');
            });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onRequestClose}>
                    &times;
                </button>
                <h2>{selectedBook ? 'Update Book' : 'Add New Book'}</h2>
                <form onSubmit={handleSubmit} className="book-form">
                    <div className="form-group">
                        <label>ISBN</label>
                        <input
                            type="text"
                            name="isbn"
                            value={book.isbn}
                            onChange={handleChange}
                            readOnly={!!selectedBook}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cover URL</label>
                        <input
                            type="text"
                            name="cover"
                            value={book.cover}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Judul</label>
                        <input
                            type="text"
                            name="judul"
                            value={book.judul}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            rows="3"
                            value={book.deskripsi}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <select
                            name="genre"
                            value={book.genre}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a genre</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Penerbit</label>
                        <input
                            type="text"
                            name="penerbit"
                            value={book.penerbit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Jumlah</label>
                        <input
                            type="number"
                            name="jumlah"
                            value={book.jumlah}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {selectedBook ? 'Update Book' : 'Add Book'}
                    </button>
                    {selectedBook && (
                        <button type="button" className="delete-button" onClick={handleDelete}>
                            Delete Book
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;
