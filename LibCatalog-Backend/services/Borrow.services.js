const pool = require ('../db/db.js');


async function borrowBook(id_user, isbn) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7); 
    const query = `
        INSERT INTO peminjaman (id_user, isbn, deadline, status)
        VALUES ($1, $2, $3, 'sedang dipinjam')
        RETURNING id_peminjaman  -- Mengembalikan id_peminjaman
    `;
    const result = await pool.query(query, [id_user, isbn, deadline.toISOString().split('T')[0]]);
    return result.rows[0].id_peminjaman;  // Mengembalikan id_peminjaman dari hasil query
}

async function returnBook(id_peminjaman) {
    const query = `
        UPDATE peminjaman
        SET status = 'sudah dikembalikan'
        WHERE id_peminjaman = $1
        RETURNING status;
    `; 
    const result = await pool.query(query, [id_peminjaman]);
    return result.rows[0].status;
}


module.exports = {
    borrowBook,
    returnBook
};
