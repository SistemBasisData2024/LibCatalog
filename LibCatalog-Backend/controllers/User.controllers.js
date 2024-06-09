const userServices = require('../services/User.services.js');
const borrowServices = require('../services/Borrow.services.js');
const reviewServices = require('../services/Review.services.js');
const readLaterServices = require('../services/readLater.services.js');
const bookServices = require('../services/Book.services.js');
const bcrypt = require('bcrypt');

async function getUserProfile(req, res) {
    const { id_user } = req.params;
    try {
        const user = await userServices.getUserProfile(id_user);
        if (!user) {
            res.status(404).json({ error: "Akun user tidak ditemukan" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function registerUser(req, res) {
    const { nama, username, password } = req.body;
    try {
        const user = await userServices.registerUser(nama, username, password);
        res.status(201).json({ message: "Successfully Registered", data: user });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ message: "Username already exists" });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const user = await userServices.loginUser(username, password);
        req.session.user = user.id_user; // Set session user setelah login berhasil
        console.log("Session user setelah login:", req.session.user); // Tambahkan logging di sini
        res.status(200).json({ message: "Login berhasil", data: user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function borrowBook(req, res) {
    const { id_user, isbn } = req.body;
    try {
        const borrow = await borrowServices.borrowBook(id_user, isbn);
        if (borrow) {
            res.status(201).json({ message: "Berhasil Meminjam Buku", data: borrow });
        } else {
            res.status(404).json({ error: "Buku tidak tersedia untuk dipinjam" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function returnBook(req, res) {
    const { id_peminjaman } = req.params;
    try {
        const returned = await borrowServices.returnBook(id_peminjaman);
        if (!returned) {
            res.status(404).json({ error: "Peminjaman tidak ditemukan" });
        } else {
            res.status(200).json({ message: "Berhasil Mengembalikan Buku", data: returned });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getBorrowedBooksByISBNandUser(req, res) {
    const { id_user, isbn } = req.params;
    try {
        const borrowedBooks = await borrowServices.getBorrowedBooksByISBNandUser(id_user, isbn,);
        if (!borrowedBooks){
            res.status(200).json({ message: "From backend: buku belum dipinjam" });
        } else {
            res.status(200).json(borrowedBooks);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getBorrowedBooksByUser(req, res) {
    const { id_user } = req.params;
    try {
        const borrowedBooks = await borrowServices.getBorrowedBooksByUser(id_user);
        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addReview(req, res) {
    const { id_user, isbn, rating, ulasan } = req.body;

    try {
        const review = await reviewServices.addReview(id_user, isbn, rating, ulasan);
        res.status(201).json({ message: "Review Berhasil Ditambahkan", data: review });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getReviews(req, res) {
    const { isbn } = req.params;

    try {
        const reviews = await reviewServices.getReviews(isbn);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addRating(req, res) {
    const { id_user, isbn, rating } = req.body;

    try {
        const rated = await reviewServices.addRating(id_user, isbn, rating);
        res.status(200).json({ message: "Rating Berhasil Ditambahkan", data: rated });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addReadLater(req, res) {
    const { id_user, isbn } = req.body;

    try {
        const readLater = await readLaterServices.addReadLater(id_user, isbn);
        if (readLater) {
            res.status(201).json({ message: "Telah disimpan ke read later", data: readLater });
        } else {
            res.status(400).json({ error: "Gagal menyimpan ke read later" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteReadLater(req, res) {
    const { id_read_later } = req.params;

    try {
        await readLaterServices.deleteReadLater(id_read_later);
        res.status(200).json({ message: "Read Later berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getReadLater(req, res) {
    const { id_user } = req.params;

    try {
        const readLater = await readLaterServices.getReadLater(id_user);
        res.status(200).json(readLater);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// BOOK
// HOME PAGE    --> GET getAllBooks, GET getGenre, GET topFiveBooks
// BOOK DETAIL  --> GET bookDetails

async function getAllBooks(req, res) {
    try {
        const result = await bookServices.getAllBooks();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getGenre(req, res) {
    const genre = req.params.genre;

    try {
        const result = await bookServices.getGenre(genre);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "Genre not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

async function topFiveBooks(req, res) {
    try {
        const topBooks = await bookServices.topFiveBooks();
        res.status(200).json(topBooks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function bookDetails(req, res) {
    const { isbn } = req.params;

    try {
        const result = await bookServices.bookDetails(isbn);
        res.status(200).json(result);
    } catch (result) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getUserProfile,
    borrowBook,
    returnBook,
    getBorrowedBooksByISBNandUser,
    getBorrowedBooksByUser,
    addReview,
    getReviews,
    addRating,
    addReadLater,
    deleteReadLater,
    getReadLater,
    registerUser,
    loginUser,
    // Untuk Buku
    getAllBooks,
    getGenre,
    topFiveBooks,
    bookDetails,
};
