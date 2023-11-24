//mongodb+srv://vikiade00:viki123158@mycluster.805cqec.mongodb.net/db_konseling
require("dotenv").config();

const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL || "mongodb:localhost/db_konseling";

const db = mongoose.connect(DB_URL);

module.exports = db;
