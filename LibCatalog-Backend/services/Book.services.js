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

async function getGenre(genre) {
    const query = `
        SELECT * FROM buku WHERE genre = $1
    `;
    const result = await pool.query(query, [genre]);
    return result.rows;
}

async function topFiveBooks() {
    const query = `
        select * from top_5_books_by_rating
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
    getGenre,
    topFiveBooks,
    bookDetails,
};
