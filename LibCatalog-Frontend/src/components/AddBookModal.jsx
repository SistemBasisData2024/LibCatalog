import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddBookModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [bookDetails, setBookDetails] = useState({
        isbn: '',
        cover: '',
        judul: '',
        deskripsi: '',
        author: '',
        genre: '',
        penerbit: '',
        jumlah: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookDetails({
            ...bookDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(bookDetails);
        setBookDetails({
            isbn: '',
            cover: '',
            judul: '',
            deskripsi: '',
            author: '',
            genre: '',
            penerbit: '',
            jumlah: 0
        });
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Book Modal"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ISBN</label>
                    <input type="text" name="isbn" value={bookDetails.isbn} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Cover</label>
                    <input type="text" name="cover" value={bookDetails.cover} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Judul</label>
                    <input type="text" name="judul" value={bookDetails.judul} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Deskripsi</label>
                    <input type="text" name="deskripsi" value={bookDetails.deskripsi} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" name="author" value={bookDetails.author} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" name="genre" value={bookDetails.genre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Penerbit</label>
                    <input type="text" name="penerbit" value={bookDetails.penerbit} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Jumlah</label>
                    <input type="number" name="jumlah" value={bookDetails.jumlah} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    );
};

export default AddBookModal;
