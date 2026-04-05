// Import Express so we can create our API server.
const express = require('express')
// Create the Express server instance.
const server = express()
// CORS allows requests from the frontend running on a different port.
const cors = require('cors') //npm install cors
// Import all API routes from routes.cjs.
const routes = require('./routes.cjs')
// Port where this backend will run.
const port = 3001

// Enable CORS globally.
server.use(cors())
// Parse form-style request bodies.
server.use(express.urlencoded({ extended: false }))
// Parse JSON request bodies.
server.use(express.json())

// Quick test route to confirm server is up.
server.get("/", (request, response) => { response.send('Hello!') } )
// Register all application routes.
server.use("/", routes)

// Start listening for incoming requests.
server.listen(port, () => { console.log(`server running on port ${port}`) })

//required server modules
//npm install cors
//npm install express
//npm install mysql2
//npm install nodemon