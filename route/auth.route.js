// routes/auth.route.js
const express = require("express");
const { login } = require("../controller/auth.controller");
const route = express.Router();

route.post("/login", login);

module.exports = route;
