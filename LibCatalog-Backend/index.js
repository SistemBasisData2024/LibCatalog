const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const profileRepo = require('./repository/profileRepo');
const bookRepo = require('./repository/bookRepo');
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

// Logging
app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});
