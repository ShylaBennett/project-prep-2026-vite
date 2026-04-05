// mysql2 package lets Node connect to a MySQL database.
const mysql = require("mysql2");

// Create a single DB connection that other files can reuse.
const conn = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,         //port: 3306
    user: "root",
    password: "",   //password: ""
    // Name of the database schema this app will query.
    database: "demoreactproject"
});

// Open the DB connection when the server starts.
conn.connect();
// Export it so controllers can run SQL queries.
module.exports = conn;