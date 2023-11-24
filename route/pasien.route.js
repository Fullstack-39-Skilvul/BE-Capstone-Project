const express = require("express");
const {
  createPasien,
  getAllPasien,
  getPasienById,
  editPasien,
  deletePasien,
} = require("../controller/pasien.controller");
const route = express.Router();

route.get("/", getAllPasien);
route.get("/:id", getPasienById);
route.post("/", createPasien);
route.put("/:id", editPasien);
route.delete("/:id", deletePasien);

module.exports = route;
