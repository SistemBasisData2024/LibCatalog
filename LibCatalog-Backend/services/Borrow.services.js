const pool = require ('../db/db.js');


async  function borrowBook(id_user, isbn, deadline) {
    const query = `
        INSERT INTO peminjaman (id_user, isbn, deadline, status)
        VALUES ($1, $2, $3, 'sedang dipinjam')
        RETURNING *
    `;
    const result = await pool.query(query, [id_user, isbn, deadline]);
    return result.rows[0];
}

async function returnBook(id_peminjaman) {
    const query = `
        UPDATE peminjaman
        SET status = 'sudah dikembalikan'
        WHERE id_peminjaman = $1
        RETURNING *
    `; 
    const result
    = await pool.query(query, [id_peminjaman]);
    return result.rows[0];
}


module.exports = {
    borrowBook,
    returnBook
};
