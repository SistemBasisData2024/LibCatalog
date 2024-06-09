const pool = require ('../db/db.js');

// BOOK
// HOME PAGE    --> GET getAllBooks, GET getGenre, GET topFiveBooks
// BOOK DETAIL  --> GET bookDetails

async function getAllBooks() {
    const query = `
        SELECT * FROM buku
    `;
    const result = await pool.query(query, []);
    return result.rows;
}

async function addBook (isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah) {
    const query = `
        INSERT INTO "buku" (isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `;
    const result = await pool.query(query, [isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah]);
    return result.rows[0];
}

async function updateBook (isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah) {
    const query = `
        UPDATE "buku"
        SET cover = $2, judul = $3, deskripsi = $4, author = $5, genre = $6, penerbit = $7, jumlah = $8
        WHERE isbn = $1
        RETURNING *
    `;
    const result = await pool.query(query, [isbn, cover, judul, deskripsi, author, genre, penerbit, jumlah]);
    return result.rows[0];
}

async function deleteBook (isbn) {
    const query = `
        DELETE FROM "buku"
        WHERE isbn = $1
        RETURNING *
    `;
    const result = await pool.query(query, [isbn]);
    return result.rows[0];
}

async function getGenre(genre) {
    const query = `
        SELECT * FROM buku WHERE genre = $1
    `;
    const result = await pool.query(query, [genre]);
    return result.rows;
}

async function topFiveBooks() {
    const query = `
        SELECT * FROM top_5_books_by_rating
    `;
    const result = await pool.query(query, []);
    return result.rows;
}

async function bookDetails(isbn) {
    const query = `
        SELECT * FROM buku
        WHERE isbn = $1
    `;

    const result = await pool.query(query, [isbn]);
    return result.rows[0];
}

module.exports = {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
    getGenre,
    topFiveBooks,
    bookDetails,
};
