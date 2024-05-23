// Book
// 

// READ LATER
// addReadLater, delReadLater, getReadLater

const register = (req, res) => {
    const { name, email, password } = req.body;

    pool.query('INSERT INTO profiles (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, password], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ id: results.rows[0].id });
    });
};

const login = (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM profiles WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(200).json(results.rows[0]);
    });
};

module.exports = {
    register,
    login,
};
