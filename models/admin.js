const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  nama: String,
  email: String,
  password: String,
  role: { type: String, default: "admin" },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
