const mongoose = require("mongoose");

const spesialisasiSchema = new mongoose.Schema({
  namaSpesialisasi: String,
});

const Spesialisasi = mongoose.model("Spesialisasi", spesialisasiSchema);

module.exports = Spesialisasi;
