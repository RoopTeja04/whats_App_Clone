const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/messages", require("./routes/payloadRoutes"));

module.exports = app;