// Import the MySQL connection object used for all database queries.
const conn = require('../connection.cjs')

module.exports = {
    // Storefront only needs to read data, so this returns the items shown on the public page.
    index(request, response) {
        const sql = `
            SELECT
                items.id,
                items.category_id,
                items.title,
                items.description,
                items.price,
                items.quantity,
                items.sku,
                categories.name AS category_name
            FROM items
            LEFT JOIN categories ON items.category_id = categories.id
            ORDER BY items.id DESC
        `
        conn.query(sql, (error, results) => {
            // If DB query fails, send generic server error.
            if (error) return response.sendStatus(500)
            // Send data in a named property so the frontend can render the storefront list.
            return response.send( { entries: results })
        })       
    }
}