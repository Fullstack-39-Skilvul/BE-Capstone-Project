const express = require("express");
const route = express.Router();

const {
  createPasien,
  getAllPasien,
  getPasienById,
  editPasien,
  deletePasien,
  getJadwalPasienById,
} = require("../controller/pasien.controller");

route.get("/", getAllPasien);
route.get("/:id", getPasienById);
route.get("/:id/jadwal", getJadwalPasienById);
route.post("/", createPasien);
route.put("/:id", editPasien);
route.delete("/:id", deletePasien);

module.exports = route;
