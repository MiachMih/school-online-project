require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.Authorization.split("")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded._id;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid token" });
  }
  next();
};

module.exports = auth;
