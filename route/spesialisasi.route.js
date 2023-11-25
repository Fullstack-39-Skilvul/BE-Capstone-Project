const express = require("express");
const {
  getAllSpesialisasi,
  getSpesialisasiById,
  createSpesialisasi,
  editSpesialisasi,
  deleteSpesialisasi,
} = require("../controller/spesialisasi.controller");
const route = express.Router();

route.get("/", getAllSpesialisasi);
route.get("/:id", getSpesialisasiById);
route.post("/", createSpesialisasi);
route.put("/:id", editSpesialisasi);
route.delete("/:id", deleteSpesialisasi);

module.exports = route;
