const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
