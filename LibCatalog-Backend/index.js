const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const profileRepo = require('./repository/profileRepo');
const profileRepo = require('./repository/bookRepo');
const db = require('./db/db');

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint
app.post('/profile', profileRepo.register);
app.get('/profile/:id', profileRepo.login);

// Logging
app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});
