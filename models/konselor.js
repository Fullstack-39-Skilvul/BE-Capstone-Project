const mongoose = require("mongoose");

const konselorSchema = new mongoose.Schema({
  nama: String,
  email: String,
  password: String,
  noTelepon: String,
  avatar: String,
  spesialisasi: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spesialisasi",
    },
  ],
});

const Konselor = mongoose.model("Konselor", konselorSchema);

module.exports = Konselor;
