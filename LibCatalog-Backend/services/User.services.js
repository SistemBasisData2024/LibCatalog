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
    if (!nama || !username || !password
    ) {
        throw new Error("All fields are required");
    }
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    const checkQuery = `
        SELECT * FROM "user"
        WHERE username = $1
    `;
    const checkUser = await pool.query(checkQuery, [username]);
    if (checkUser.rows.length > 0) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO "user" (nama, username, password)
        VALUES ($1, $2, $3)
        RETURNING id_user
    `;
    const result = await pool.query(query, [nama, username, hashedPassword]);
    return result.rows[0];
}

async function loginUser(username, password) {
    const query = `
        SELECT * FROM "user"
        WHERE username = $1
    `;
    const result = await pool.query(query, [username]);
    if (result.rows.length <= 0) {
        throw new Error("Invalid username or password");
    }

    const user = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid username or password");
    }
    return user;
}

async function logoutUser(req, res) {
    req.session.destroy();
    res.status(200).json({ message: "Logout berhasil" });
}

module.exports = {
    getUserProfile,
    registerUser,
    loginUser
};
