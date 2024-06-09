const pool = require ('../db/db.js');


async function addReadLater (id_user, isbn) {
    const query = `
        INSERT INTO "readLater" (id_user, isbn)
        VALUES ($1, $2)
        RETURNING *
    `;
    const result = await pool.query(query, [id_user, isbn]);
    return result.rows[0];
}

async function getReadLater (id_user) {
    const query = `
        SELECT * FROM "readLater"
        WHERE id_user = $1
    `;
    const result
    = await pool.query(query, [id_user]);
    return result.rows;
}

async function deleteReadLater (id_read_later) {
    const query = `
        DELETE FROM "readLater"
        WHERE id_read_later = $1
    `;
    await pool.query(query, [id_read_later]);
}
module.exports = {
    addReadLater,
    getReadLater,
    deleteReadLater
};