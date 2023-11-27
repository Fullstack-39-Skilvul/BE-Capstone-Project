const mongoose = require("mongoose");

const konselorSchema = new mongoose.Schema({
  nama: String,
  email: String,
  password: String,
  noTelepon: String,
  avatar: {
    type: String,
    default: "https://i.stack.imgur.com/l60Hf.png",
  },
  spesialisasi: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spesialisasi",
    },
  ],
  role: { type: String, default: "konselor" },
});

const Konselor = mongoose.model("Konselor", konselorSchema);

module.exports = Konselor;
