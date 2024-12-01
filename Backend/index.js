const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const loginRoute = require("./Routes/loginRoute");
const signinRouter = require("./Routes/signinRoute");
const mongoDb = require("./DB/mongodb");

const app = express();

app.use("/api", loginRoute);
app.use("/api", signinRouter);

app.listen(3000, () => {
  mongoDb();
  console.log("server is running");
});
