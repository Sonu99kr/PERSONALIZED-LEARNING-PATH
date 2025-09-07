const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../Models/Users");

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
