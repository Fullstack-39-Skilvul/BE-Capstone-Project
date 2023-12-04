const express = require("express");
const {
  getAllSpesialisasi,
  getSpesialisasiById,
  createSpesialisasi,
  editSpesialisasi,
  deleteSpesialisasi,
} = require("../controller/spesialisasi.controller");
const verifyToken = require("../middleware/verifyToken.middleware");
const route = express.Router();

route.get("/", verifyToken(["admin", "konselor"]), getAllSpesialisasi);
route.get("/:id", verifyToken(["admin", "konselor"]), getSpesialisasiById);
route.post("/", verifyToken(["admin"]), createSpesialisasi);
route.put("/:id", verifyToken(["admin", "konselor"]), editSpesialisasi);
route.delete("/:id", verifyToken(["admin"]), deleteSpesialisasi);

module.exports = route;
