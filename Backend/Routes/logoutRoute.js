const express = require("express");
const logout = require("../Controllers/logout");
const logoutRoute = express.Router();

logoutRoute.post("/logout", logout);

module.exports = logoutRoute;
