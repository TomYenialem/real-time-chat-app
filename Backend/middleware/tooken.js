const jwt = require("jsonwebtoken");

const createToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt_token", token, {
    httpOnly: true, //This option makes the cookie inaccessible to JavaScript running on the client-side (e.g., in the browser console).
    expires: new Date(Date.now() + 3600000 * 24 * 30), //equals to 30days 1hr equals to 3600000miliseconds
    secure: false, // set to true if your site is served over HTTPS
  });
};
module.exports = createToken;
