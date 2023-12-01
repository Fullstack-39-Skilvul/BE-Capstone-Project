const express = require("express");
const route = express.Router();
const {
  getAllPayment,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentById,
} = require("../controller/payment.controller");
const verifyToken = require("../middleware/verifyToken.middleware");

route.get("/", verifyToken(["admin"]), getAllPayment);
route.get("/:id", verifyToken(["admin"]), getPaymentById);
route.post("/", verifyToken(["admin", "pasien"]), createPayment);
route.put("/:id", verifyToken(["admin", "konselor"]), updatePayment);
route.delete("/:id", verifyToken(["admin"]), deletePayment);

module.exports = route;
