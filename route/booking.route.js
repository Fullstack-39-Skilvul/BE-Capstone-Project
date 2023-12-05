const express = require("express");
const {
  getAllBooking,
  getBookingById,
  createBooking,
  editBooking,
  deleteBooking,
} = require("../controller/booking.controller");
const verifyToken = require("../middleware/verifyToken.middleware");
const route = express.Router();

route.get("/", verifyToken(["admin"]), getAllBooking);
route.get("/:id", verifyToken(["admin", "konselor", "pasien"]), getBookingById);
route.post("/", verifyToken(["admin", "pasien"]), createBooking);
route.put("/:id", verifyToken(["admin", "konselor"]), editBooking);
route.delete("/:id", verifyToken(["admin"]), deleteBooking);

module.exports = route;
