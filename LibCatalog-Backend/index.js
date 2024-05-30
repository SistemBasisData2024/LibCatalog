const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const profileRepo = require('./repository/profileRepo');
const bookRepo = require('./repository/bookRepo');
const userControllers = require('./controllers/User.controllers');
const db = require('./db/db');
require('dotenv').config();

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// Endpoint Profile
app.post('/profile', profileRepo.register);
app.get('/profile/:id', profileRepo.login);
// Endpoint Book
app.get('/home', bookRepo.getAllBooks);
app.get('/home/:genre', bookRepo.getGenre);
app.get('/home/top', bookRepo.topFiveBooks);
app.get('/book/:isbn', bookRepo.bookDetails);

//endpoint user
app.get('/user/:id_user', userControllers.getUserProfile);
app.post('/borrow', userControllers.borrowBook);
app.put('/return/:id_peminjaman', userControllers.returnBook);
app.post('/review', userControllers.addReview);
app.get('/review/:isbn', userControllers.getReviews);
app.post('/readlater', userControllers.addReadLater);
app.get('/readlater/:id_user', userControllers.getReadLater);
app.delete('/readlater/:id_read_later', userControllers.deleteReadLater);
app.post('/rating', userControllers.addRating);
app.post('/register', userControllers.registerUser);
app.post('/login', userControllers.loginUser);


// Logging
app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});
