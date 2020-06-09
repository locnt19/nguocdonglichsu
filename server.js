const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 3000;
const routes = require('./src/routes');

// database connection
require('./src/config/database');

// models
require('./src/models/User');

// configure body parser for AJAX requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: false can not send 'nested object'
app.use(cors()); // enable cross-site HTTP requests

// routes
app.use(routes);

// bootstrap server
const server = http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});