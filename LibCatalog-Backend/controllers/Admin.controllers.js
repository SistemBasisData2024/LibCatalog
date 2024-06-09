const adminServices = require('../services/Admin.services');
const bookServices = require('../services/Book.services.js');
const bcrypt = require('bcrypt');

async function getAdminProfile(req, res) {
    const { id_admin } = req.params;
    try {
        const admin = await adminServices.getAdminProfile(id_admin);
        if (!admin) {
            res.status(404).json({ error: "Akun admin tidak ditemukan" });
        } else {
            res.status(200).json(admin);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function registerAdmin(req, res) {
    const { nama, username, password } = req.body;
    try {
        const admin = await adminServices.registerAdmin(nama, username, password);
        res.status(201).json({ message: "Berhasil Melakukan Register", data: admin });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function loginAdmin(req, res) {
    const { username, password } = req.body;
    try {
        const admin = await adminServices.loginAdmin(username, password);
        req.session.admin = admin.id_admin; // Set session admin setelah login berhasil
        console.log("Session admin setelah login:", req.session.admin); // Tambahkan logging di sini
        res.status(200).json({ message: "Login berhasil", data: admin });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addBook (req, res) {
    const { isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah } = req.body;
    try {
        const book = await bookServices.addBook(isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah);
        if (book) {
            res.status(201).json({ message: "Book added succesfully!", data: book });
        } else {
            res.status(400).json({ error: "Failed to add book" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateBook (req, res) {
    const { isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah } = req.body;
    try {
        const book = await bookServices.updateBook(isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah);
        if (book) {
            res.status(200).json({ message: "Book updated succesfully!", data: book });
        } else {
            res.status(400).json({ error: "Failed to update book" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteBook (req, res) {
    const { isbn } = req.params;
    try {
        const book = await bookServices.deleteBook(isbn);
        if (book) {
            res.status(200).json({ message: "Book deleted succesfully!" });
        } else {
            res.status(404).json({ error: "Failed to delete book" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getAdminProfile,
    registerAdmin,
    loginAdmin,
    addBook,
    updateBook,
    deleteBook
};