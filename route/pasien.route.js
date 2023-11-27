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
const verifyToken = require("../middleware/verifyToken.middleware");

route.get("/", verifyToken(["admin"]), getAllPasien);
route.get("/:id", verifyToken(["admin"]), getPasienById);
route.get("/:id/jadwal", verifyToken(["admin", "pasien"]), getJadwalPasienById);
route.post("/", createPasien);
route.put("/:id", verifyToken(["admin"]), editPasien);
route.delete("/:id", verifyToken(["admin"]), deletePasien);

module.exports = route;
