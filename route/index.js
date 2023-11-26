const express = require("express");
const route = express.Router();

const pasienRoute = require("./pasien.route");
const spesialisasiRoute = require("./spesialisasi.route");
const konselorRoute = require("./konselor.route");
const jenisKonselingRoute = require("./jenisKonseling.route");
const bookingRoute = require("./booking.route");
const paymentRoute = require("./payment.route");

route.get("/", (req, res) => {
  try {
    res.status(200).json("Welcome to API Konseling WEB");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.use("/pasiens", pasienRoute);
route.use("/konselors", konselorRoute);
route.use("/spesialisasis", spesialisasiRoute);
route.use("/jenisKonselings", jenisKonselingRoute);
route.use("/bookings", bookingRoute);
route.use("/payments", paymentRoute);

module.exports = route;
