const mongoose = require("mongoose");

const jeniskonselingSchema = new mongoose.Schema({
  jenis: String,
  harga: Number,
  platformPertemuan: String,
});

const JenisKonseling = mongoose.model("JenisKonseling", jeniskonselingSchema);

module.exports = JenisKonseling;
