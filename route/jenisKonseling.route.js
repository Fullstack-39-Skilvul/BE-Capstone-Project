const express = require("express");
const {
  deleteJenisKonseling,
  getAllJenisKonseling,
  getJenisKonselingById,
  createJenisKonseling,
  editJenisKonseling,
} = require("../controller/jenisKonseling.controller");
const route = express.Router();

route.get("/", getAllJenisKonseling);
route.get("/:id", getJenisKonselingById);
route.post("/", createJenisKonseling);
route.put("/:id", editJenisKonseling);
route.delete("/:id", deleteJenisKonseling);

module.exports = route;
