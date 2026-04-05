// Import the MySQL connection object used for all database queries.
const conn = require('../connection.cjs')

module.exports = {
    // GET: return all entries from the table.
   index(request, response) {
        const sql = `SELECT * FROM items INNER JOIN categories ON items.category_id = categories.id`
        conn.query(sql, (error, results) => {
            // If DB query fails, send generic server error.
            if (error) return response.sendStatus(500)
            // Send data in a named property so frontend can read response.data.entries.
            return response.send( { entries: results })
        })       
    }
}