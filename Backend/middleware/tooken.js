const jwt = require("jsonwebtoken");

const createToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt_token", token, {
    httpOnly: true,
    secure: false, // Secure only in production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};
module.exports = createToken;
