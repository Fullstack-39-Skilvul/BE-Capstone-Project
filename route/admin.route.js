const express = require("express");
const {
  getAllAdmin,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
} = require("../controller/admin.controller");

const verifyToken = require("../middleware/verifyToken.middleware");
const route = express.Router();

route.get("/", verifyToken(["admin"]), getAllAdmin);
route.get("/:id", verifyToken(["admin"]), getAdminById);
route.post("/", createAdmin);
route.put("/:id", verifyToken(["admin"]), editAdmin);
route.delete("/:id", verifyToken(["admin"]), deleteAdmin);

module.exports = route;
