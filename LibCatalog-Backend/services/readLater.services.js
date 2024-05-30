const pool = require ('../db/db.js');


async function addReadLater (id_user, isbn) {
    const query = `
        INSERT INTO read_later (id_user, isbn)
        VALUES ($1, $2)
        RETURNING *
    `;
    const result = await pool.query(query, [id_user, isbn]);
    return result.rows[0];
}

async function getReadLater (id_user) {
    const query = `
        SELECT * FROM read_later
        WHERE id_user = $1
    `;
    const result
    = await pool.query(query, [id_user]);
}

async function deleteReadLater (id_user, isbn) {
    const query = `
        DELETE FROM read_later
        WHERE id_user = $1 AND isbn = $2
        RETURNING *
    `;
    const result = await pool.query(query, [id_user, isbn]);
    return result.rows[0];
}

module.exports = {
    addReadLater,
    getReadLater,
    deleteReadLater
};