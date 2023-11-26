const express = require("express");
const {
  getAllBooking,
  getBookingById,
  createBooking,
  editBooking,
  deleteBooking,
} = require("../controller/booking.controller");
const route = express.Router();

route.get("/", getAllBooking);
route.get("/:id", getBookingById);
route.post("/", createBooking);
route.put("/:id", editBooking);
route.delete("/:id", deleteBooking);

module.exports = route;
