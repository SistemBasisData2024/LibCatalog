const pool = require('../db/db.js');
const bcrypt = require('bcrypt');

async function getAdminProfile(id_admin) {
    const query = `
        SELECT * FROM admin
        WHERE id_admin = $1
    `;
    const result = await pool.query(query, [id_admin]);
    return result.rows[0];
}

async function registerAdmin(nama, username, password) {
    if (!nama || !username || !password
    ) {
        throw new Error("All fields are required");
    }
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    const checkQuery = `
        SELECT * FROM admin
        WHERE username = $1
    `;
    const checkAdmin = await pool.query(checkQuery, [username]);
    if (checkAdmin.rows.length > 0) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO admin (nama, username, password)
        VALUES ($1, $2, $3)
        RETURNING id_admin
    `;
    const result = await pool.query(query, [nama, username, hashedPassword]);
    return result.rows[0];
}

async function loginAdmin(username, password) {
    const query = `
        SELECT * FROM admin
        WHERE username = $1
    `;
    const result = await pool.query(query, [username]);
    if (result.rows.length <= 0) {
        throw new Error("Invalid username or password");
    }

    const admin = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid username or password");
    }
    return admin;
}

async function logoutAdmin(req, res) {
    req.session.destroy();
    res.status(200).json({ message: "Logout berhasil" });
}

module.exports = {
    getAdminProfile,
    registerAdmin,
    loginAdmin,
    logoutAdmin
};
