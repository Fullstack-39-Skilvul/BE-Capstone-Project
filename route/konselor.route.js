const express = require("express");
const upload = require("../utils/multer");

const {
  createKonselor,
  getAllKonselor,
  getKonselorById,
  editKonselor,
  deleteKonselor,
  getJadwalKonselorById,
} = require("../controller/konselor.controller");
const verifyToken = require("../middleware/verifyToken.middleware");
const route = express.Router();

route.get("/", verifyToken(["admin"]), getAllKonselor);
route.get("/:id", verifyToken(["admin"]), getKonselorById);
route.get(
  "/:id/jadwal",
  verifyToken(["admin", "konselor"]),
  getJadwalKonselorById
);
route.post(
  "/",
  upload.single("avatar"),
  verifyToken(["admin"]),
  createKonselor
);
route.put(
  "/:id",
  upload.single("avatar"),
  verifyToken(["admin", "konselor"]),
  editKonselor
);
route.delete("/:id", verifyToken(["admin"]), deleteKonselor);

module.exports = route;
