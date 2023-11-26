const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  metodePembayaran: String,
  tanggalBayar: Date,
  statusPembayaran: {
    type: String,
    default: "Pending",
  },
  dataBooking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
