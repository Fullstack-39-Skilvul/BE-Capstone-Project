const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  try {
    // Lakukan operasi atau logika bisnis di sini

    // Jika data berhasil ditemukan atau operasi berhasil
    res.status(200).json("Welcome to API Konseling WEB");
  } catch (error) {
    // Tangani kesalahan
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
