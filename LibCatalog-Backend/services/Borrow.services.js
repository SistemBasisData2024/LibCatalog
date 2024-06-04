const pool = require ('../db/db.js');


async function updateQuantity(isbn, jumlah) {
    const query = `
        UPDATE buku
        SET jumlah = jumlah - $2
        WHERE isbn = $1
    `;
    await pool.query(query, [isbn, jumlah]);
}

async function checkBorrowedBooks(id_user ,isbn) {
    const query = `
        SELECT * FROM peminjaman
        WHERE id_user = $1 AND isbn = $2 AND status = 'sedang dipinjam'
    `;
    const result = await pool.query(query, [id_user, isbn]);
    return result.rows.length > 0;
}

async function borrowBook(id_user, isbn) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7); 
    const query = `
        INSERT INTO peminjaman (id_user, isbn, deadline, status)
        VALUES ($1, $2, $3, 'sedang dipinjam')
        RETURNING id_peminjaman  
    `;
    const result = await pool.query(query, [id_user, isbn, deadline.toISOString().split('T')[0]]);
    await updateQuantity(isbn, 1);
    return result.rows[0].id_peminjaman;  
}

async function returnBook(id_peminjaman) {
    const query = `
        UPDATE peminjaman
        SET status = 'sudah dikembalikan'
        WHERE id_peminjaman = $1
        RETURNING status, id_peminjaman, isbn;
    `; 
    const result = await pool.query(query, [id_peminjaman]);
    await updateQuantity(result.rows[0].isbn, -1);
    return result.rows[0].status;
}

async function getBorrowedBooksByISBNandUser(id_user, isbn) {
    const query = `
        SELECT * FROM peminjaman
        WHERE id_user = $1 AND isbn = $2
    `;
    const result = await pool.query(query, [id_user, isbn]);
    return result.rows;
}

module.exports = {
    updateQuantity,
    borrowBook,
    returnBook,
    checkBorrowedBooks,
    getBorrowedBooksByISBNandUser
};
