// Import the MySQL connection object used for all database queries.
const conn = require('../connection.cjs')

module.exports = {
    // GET: return all entries from the table.
    index(request, response) {
        const sql = `SELECT * FROM items`
        conn.query(sql, (error, results) => {
            // If DB query fails, send generic server error.
            if (error) return response.sendStatus(500)
            // Send data in a named property so frontend can read response.data.entries.
            return response.send( { entries: results })
        })       
    },
    // POST: insert a new entry, then return the full updated list.
    store(request, response) {
        const sql = `INSERT INTO items (category_id, title, description, price, quantity, sku) VALUES (?, ?, ?, ?, ?, ?)`
        // Placeholder values come from the request body.
        const values = [request.body.item.category_id, request.body.item.title, request.body.item.description, request.body.item.price, request.body.item.quantity, request.body.item.sku]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            // After insert, fetch and return all entries so frontend state stays in sync.
            const sql = `SELECT * FROM items`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { entries: results })
            })
        })
    },
    // PATCH: update an existing entry by id, then return full updated list.
    update(request, response){
        const sql = `UPDATE items SET category_id = ?, title=?, description=?, price=?, quantity=?, sku=? WHERE id=?`
        const values = [request.body.item.category_id, request.body.item.title, request.body.item.description, request.body.item.price, request.body.item.quantity, request.body.item.sku, request.body.item.id]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            // Return all entries so frontend table refreshes immediately.
            const sql = `SELECT * FROM items`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { entries: results })
            })
        })
    },
    // DELETE: remove entry by id, then return full updated list.
    destroy(request, response){
        const sql = `DELETE FROM items WHERE id=?`
        // Value comes from URL parameter (for example, /items/3).
        const values = [request.params.item]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            // Return all entries so frontend sees the delete right away.
            const sql = `SELECT * FROM items`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { entries: results })
            })
        })
    }
}