const express = require("express");
const loginRoute = express.Router();
const loginController = require("../Controllers/login");

loginRoute.post("/login", loginController);

module.exports=loginRoute
