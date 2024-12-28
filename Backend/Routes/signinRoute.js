const express = require("express");
const signinRouter = express.Router();
const { signinController, getUsers } = require("../Controllers/signin");
const auth = require("../middleware/auth");

signinRouter.post("/signin", signinController);
signinRouter.get("/getuser", auth, getUsers);
module.exports = signinRouter;
