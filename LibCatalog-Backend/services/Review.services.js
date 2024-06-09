const pool = require ('../db/db.js');

async function addReview (id_user, isbn, rating, ulasan) {
    const query = `
        INSERT INTO review (id_user, isbn, rating, ulasan)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const result = await pool.query(query, [id_user, isbn, rating, ulasan]);
    return result.rows[0];
}

async function getReviews (isbn) {
    const query = `
        SELECT * FROM review
        WHERE isbn = $1
    `;
    const result = await pool.query(query, [isbn]);
    return result.rows;
}

async function addRating (id_user, isbn, rating) {
    // Check if the user has already rated this book
    const checkQuery = `
        SELECT * FROM review
        WHERE id_user = $1 AND isbn = $2
    `;
    const checkResult = await pool.query(checkQuery, [id_user, isbn]);

    if (checkResult.rowCount > 0) {
        const query = `
            UPDATE review
            SET rating = $1
            WHERE id_user = $2 AND isbn = $3
            RETURNING *
        `;
        const result = await pool.query(query, [rating, id_user, isbn]);
        return result.rows[0];
    } else {
        const query = `
            INSERT INTO review (id_user, isbn, rating)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await pool.query(query, [id_user, isbn, rating]);
        return result.rows[0];
    }
}

module.exports = {
    addReview,
    getReviews,
    addRating
};
