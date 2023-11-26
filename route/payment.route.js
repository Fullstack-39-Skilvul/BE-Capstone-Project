const express = require("express");
const route = express.Router();
const {
  getAllPayment,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controller/payment.controller");

route.get("/", getAllPayment);
route.get("/:id");
route.post("/", createPayment);
route.put("/:id", updatePayment);
route.delete("/:id", deletePayment);

module.exports = route;
