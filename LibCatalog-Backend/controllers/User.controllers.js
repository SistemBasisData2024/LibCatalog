const pool = require ('../db/db.js');


async function getUserProfile(req, res) {
    const { id_user } = req.params;

    try {
        const query = `
            SELECT * FROM "user"
            WHERE id_user = $1
        `;
        const result = await pool.query(query, [id_user]);
        
        if (result.rowCount === 0) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function borrowBook (req, res) {
    const { id_user, isbn, deadline } = req.body;

    try {
        const query = `
            INSERT INTO peminjaman (id_user, isbn, deadline, status)
            VALUES ($1, $2, $3, 'sedang dipinjam')
            RETURNING *
        `;
        const result = await pool.query(query, [id_user, isbn, deadline]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function returnBook(req, res) {
    const { id_peminjaman } = req.params;

    try {
        const query = `
            UPDATE peminjaman
            SET status = 'sudah dikembalikan'
            WHERE id_peminjaman = $1
            RETURNING *
        `;
        const result = await pool.query(query, [id_peminjaman]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: "Peminjaman not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addReview(req, res) {
    const { id_user, isbn, rating, ulasan } = req.body;

    try {
        const query = `
            INSERT INTO review (id_user, isbn, rating, ulasan)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [id_user, isbn, rating, ulasan]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getReviews(req, res) {
    const { isbn } = req.params;

    try {
        const query = `
            SELECT * FROM review
            WHERE isbn = $1
        `;
        const result = await pool.query(query, [isbn]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addRating(req, res) {
    const { id_user, isbn, rating } = req.body;

    try {
        // Check if the user has already rated this book
        const checkQuery = `
            SELECT * FROM review
            WHERE id_user = $1 AND isbn = $2
        `;
        const checkResult = await pool.query(checkQuery, [id_user, isbn]);

        if (checkResult.rowCount > 0) {
            // Update existing rating
            const updateQuery = `
                UPDATE review
                SET rating = $3
                WHERE id_user = $1 AND isbn = $2
                RETURNING *
            `;
            const updateResult = await pool.query(updateQuery, [id_user, isbn, rating]);
            res.status(200).json(updateResult.rows[0]);
        } else {
            // Insert new rating
            const insertQuery = `
                INSERT INTO review (id_user, isbn, rating)
                VALUES ($1, $2, $3)
                RETURNING *
            `;
            const insertResult = await pool.query(insertQuery, [id_user, isbn, rating]);
            res.status(201).json(insertResult.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function userAddReadlater (req, res) {
    const { id_user, isbn } = req.body;

    try {
        const query = `
            INSERT INTO readLater (id_user, isbn)
            VALUES ($1, $2)
            RETURNING *
        `;
        const result = await pool.query(query, [id_user, isbn]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function userDeleteReadlater (req, res) {
    const { id_user, isbn } = req.body;

    try {
        const query = `
            DELETE FROM readLater
            WHERE id_user = $1 AND isbn = $2
            RETURNING *
        `;
        const result = await pool.query(query, [id_user, isbn]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: "Read later not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function userGetReadLater(req, res) {
    const { id_user } = req.params;

    try {
        const query = `
            SELECT buku.*
            FROM readLater
            JOIN buku ON readLater.isbn = buku.isbn
            WHERE readLater.id_user = $1
        `;
        const result = await pool.query(query, [id_user]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getUserProfile,
    borrowBook,
    returnBook,
    addReview,
    getReviews,
    addRating,
    userAddReadlater,
    userDeleteReadlater,
    userGetReadLater
};