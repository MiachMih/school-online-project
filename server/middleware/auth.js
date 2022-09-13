require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    req.userPassword = decoded.password;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid token" });
  }
  next();
};

module.exports = auth;
