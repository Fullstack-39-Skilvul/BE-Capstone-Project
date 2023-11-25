const express = require("express");
const upload = require("../utils/multer");

const {
  createKonselor,
  getAllKonselor,
  getKonselorById,
  editKonselor,
  deleteKonselor,
} = require("../controller/konselor.controller");
const route = express.Router();

route.get("/", getAllKonselor);
route.get("/:id", getKonselorById);
route.post("/", upload.single("avatar"), createKonselor);
route.put("/:id", upload.single("avatar"), editKonselor);
route.delete("/:id", deleteKonselor);

module.exports = route;
