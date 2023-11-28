const express = require("express");
const {
  deleteJenisKonseling,
  getAllJenisKonseling,
  getJenisKonselingById,
  createJenisKonseling,
  editJenisKonseling,
} = require("../controller/jenisKonseling.controller");
const verifyToken = require("../middleware/verifyToken.middleware");
const route = express.Router();

route.get("/", getAllJenisKonseling);
route.get("/:id", getJenisKonselingById);
route.post("/", verifyToken(["admin"]), createJenisKonseling);
route.put("/:id", verifyToken(["admin"]), editJenisKonseling);
route.delete("/:id", verifyToken(["admin"]), deleteJenisKonseling);

module.exports = route;
