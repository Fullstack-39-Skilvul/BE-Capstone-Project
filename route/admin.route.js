const express = require("express");
const {
  getAllAdmin,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
} = require("../controller/admin.controller");
const route = express.Router();

route.get("/", getAllAdmin);
route.get("/:id", getAdminById);
route.post("/", createAdmin);
route.put("/:id", editAdmin);
route.delete("/:id", deleteAdmin);

module.exports = route;
