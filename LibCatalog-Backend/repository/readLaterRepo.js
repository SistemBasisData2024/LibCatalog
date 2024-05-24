// READ LATER
// HOME PAGE        --> POST addReadLater
// READLATER PAGE   --> GET getReadLater, DELETE delReadLater



// async function getAllBooks(req, res){
//     try {
//         const result = await pool.query('SELECT * FROM buku');
//         const events = result.rows;
//         res.status(200).json(events);
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

module.exports = {
    addReadLater,
    getReadLater,
    delReadLater,
};
