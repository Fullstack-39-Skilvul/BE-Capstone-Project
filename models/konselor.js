const mongoose = require("mongoose");

const konselorSchema = new mongoose.Schema({
  nama: String,
  email: String,
  password: String,
  noTelepon: String,
  avatar: String,
  spesialisasi: {
    type: mongoose.ObjectID,
    ref: "Spesialisasi",
  },
});

const Konselor = mongoose.model("Konselor", konselorSchema);

module.exports = Konselor;
