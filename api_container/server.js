const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const app = express();

const { PORT, MONGODB_URI } = require("./configs/config");
const connectDB = require("./db");

// database connection
connectDB(MONGODB_URI);

// configure ExpressJS
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: false => can not send 'nested object'
app.use(cors());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// console.log('hello world');

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
