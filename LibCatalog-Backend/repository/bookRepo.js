// BOOK
// HOME PAGE    --> GET getAllBooks, GET getGenre, GET topFiveBooks
// BOOK DETAIL  --> GET bookDetails

async function getAllBooks(req, res){
    try {
        const result = await pool.query('SELECT * FROM buku');
        const events = result.rows;
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getGenre(req, res){
    const genre = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM buku WHERE genre = $1',
            [genre]
        );
        const event = result.rows[0];
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ error: "Genre not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

async function topFiveBooks(req, res) {
    try {
        const result = await pool.query(
            `
            SELECT * FROM buku
            ORDER BY rating DESC
            LIMIT 5
            `
        );
        const topBooks = result.rows;
        res.status(200).json(topBooks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function bookDetails(req, res) {
    const { isbn } = req.params;

    try {
        const query = `
            SELECT * FROM buku
            WHERE isbn = $1
        `;

        const result = await pool.query(query, [isbn]);
        const book = result.rows[0];

        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getAllBooks,
    getGenre,
    topFiveBooks,
    bookDetails,
};
