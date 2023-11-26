const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tanggal: Date,
  waktu: String,
  status: {
    type: String,
    default: "Pending",
  },
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien",
  },
  konselor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Konselor",
  },
  jenisKonseling: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JenisKonseling",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
