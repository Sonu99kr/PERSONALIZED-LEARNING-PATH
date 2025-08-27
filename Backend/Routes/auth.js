const express = require("express");
const router = express.Router();
const authMiddleWare = require("../Middleware/middlewareAuth");

router.get("/verify", authMiddleWare, (req, res) => {
  res.json({ valid: true, user: req.user });
});

module.exports = router;
