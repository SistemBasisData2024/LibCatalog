const cors = require('cors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userControllers = require('./controllers/User.controllers');
const adminControllers = require('./controllers/Admin.controllers');
const db = require('./db/db');
require('dotenv').config();

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// DARI GPT INI 
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// Endpoint Book
app.get('/home', userControllers.getAllBooks);
app.get('/home/genre/:genre', userControllers.getGenre);
app.get('/home/top', userControllers.topFiveBooks);
app.get('/book/:isbn', userControllers.bookDetails); //ininini

// Endpoint User
app.get('/user/:id_user', userControllers.getUserProfile);
app.post('/borrow', userControllers.borrowBook);
app.put('/return/:id_peminjaman', userControllers.returnBook);
app.get('/borrow/:id_user/:isbn', userControllers.getBorrowedBooksByISBNandUser);
app.post('/review', userControllers.addReview);
app.get('/review/:isbn', userControllers.getReviews);

app.post('/readlater/:id_user/:isbn', userControllers.addReadLater);
app.get('/readlater/:id_user', userControllers.getReadLater);
app.delete('/readlater/:id_read_later', userControllers.deleteReadLater);

app.post('/rating', userControllers.addRating);
app.post('/register/user', userControllers.registerUser);
app.post('/login/user', userControllers.loginUser);
// app.post('/login/admin', adminControllers.loginAdmin);


// Logging
app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});
