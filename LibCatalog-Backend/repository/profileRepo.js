const { Pool } = require('pg');

const pool = new Pool({
    user: 'your-username',
    host: 'your-database-host',
    database: 'your-database-name',
    password: 'your-password',
});

pool.connect().then (() => {
    console.log("Server is running and listening on port", port);
});

module.exports = pool;
