const pool = require('../db/db.js');
const bcrypt = require('bcrypt');


async function getUserProfile(id_user) {
    const query = `
        SELECT * FROM "user"
        WHERE id_user = $1
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows[0];
}
async function registerUser(nama, username, password) {
    const query = `
        INSERT INTO "user" (nama, username, password)
        VALUES ($1, $2, $3)
        RETURNING id_user
    `;
    const result = await pool.query(query, [nama, username, password]);
    return result.rows[0];
}

async function loginUser(username, password) {
    const query = `
        SELECT * FROM "user"
        WHERE username = $1 AND password = $2
    `;
    const result = await pool.query(query, [username, password]);
    return result.rows[0];
}



module.exports = {
    getUserProfile,
    registerUser,
    loginUser
};
