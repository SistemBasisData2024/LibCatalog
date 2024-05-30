const userServices = require('../services/User.services.js');
const borrowServices = require('../services/Borrow.services.js');
const reviewServices = require('../services/Review.services.js');
const readLaterServices = require('../services/readLater.services.js');

async function getUserProfile(req, res) {
    const { id_user } = req.params;

    try {
        const user = await userServices.getUserProfile(id_user);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function registerUser(req, res) {
    const { name, username, password } = req.body;

    try {
        const user = await userServices.registerUser(name, username, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await userServices.loginUser(username, password);
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function borrowBook(req, res) {
    const { id_user, isbn, deadline } = req.body;

    try {
        const borrow = await borrowServices.borrowBook(id_user, isbn, deadline);
        res.status(201).json(borrow);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function returnBook(req, res) {
    const { id_peminjaman } = req.params;

    try {
        const returned = await borrowServices.returnBook(id_peminjaman);
        if (!returned) {
            res.status(404).json({ error: "Peminjaman not found" });
        } else {
            res.status(200).json(returned);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addReview(req, res) {
    const { id_user, isbn, rating, ulasan } = req.body;

    try {
        const review = await reviewServices.addReview(id_user, isbn, rating, ulasan);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getReviews(req, res) {
    const { isbn } = req.params;

    try {
        const reviews = await reviewServices.getReviews(isbn);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addRating(req, res) {
    const { id_user, isbn, rating } = req.body;

    try {
        const rated = await reviewServices.addRating(id_user, isbn, rating);
        res.status(200).json(rated);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addReadLater(req, res) {
    const { id_user, isbn } = req.body;

    try {
        const readLater = await readLaterServices.addReadLater(id_user, isbn);
        res.status(201).json(readLater);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteReadLater(req, res) {
    const { id_user, isbn } = req.body;

    try {
        const readLater = await readLaterServices.deleteReadLater(id_user, isbn);
        if (!readLater) {
            res.status(404).json({ error: "Read later not found" });
        } else {
            res.status(200).json(readLater);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getReadLater(req, res) {
    const { id_user } = req.params;

    try {
        const readLater = await readLaterServices.getReadLater(id_user);
        res.status(200).json(readLater);
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
    addReadLater,
    deleteReadLater,
    getReadLater,
    registerUser,
    loginUser
};
