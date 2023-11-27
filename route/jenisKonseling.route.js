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

route.get("/", verifyToken(["admin"]), getAllJenisKonseling);
route.get("/:id", verifyToken(["admin"]), getJenisKonselingById);
route.post("/", verifyToken(["admin"]), createJenisKonseling);
route.put("/:id", verifyToken(["admin"]), editJenisKonseling);
route.delete("/:id", verifyToken(["admin"]), deleteJenisKonseling);

module.exports = route;
