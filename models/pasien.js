const mongoose = require("mongoose");

const pasienSchema = new mongoose.Schema({
  namaPasien: String,
  email: String,
  password: String,
  alamat: String,
  noTelepon: String,
});

const Pasien = mongoose.model("Pasien", pasienSchema);

module.exports = Pasien;
