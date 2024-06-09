const adminServices = require('../services/Admin.services');
const bcrypt = require('bcrypt');

async function getAdminProfile(req, res) {
    const { id_admin } = req.params;
    try {
        const admin = await adminServices.getAdminProfile(id_admin);
        if (!admin) {
            res.status(404).json({ error: "Akun admin tidak ditemukan" });
        } else {
            res.status(200).json(admin);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function registerAdmin(req, res) {
    const { nama, username, password } = req.body;
    try {
        const admin = await adminServices.registerAdmin(nama, username, password);
        res.status(201).json({ message: "Berhasil Melakukan Register", data: admin });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function loginAdmin(req, res) {
    const { username, password } = req.body;
    try {
        const admin = await adminServices.loginAdmin(username, password);
        req.session.admin = admin.id_admin; // Set session admin setelah login berhasil
        console.log("Session admin setelah login:", req.session.admin); // Tambahkan logging di sini
        res.status(200).json({ message: "Login berhasil", data: admin });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getAdminProfile,
    registerAdmin,
    loginAdmin
};