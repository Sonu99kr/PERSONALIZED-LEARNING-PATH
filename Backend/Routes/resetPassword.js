const express = require("express");
const {
  requestPasswordReset,
  resetPassword,
  verifyResetToken,
} = require("../Controllers/passwordResetController");

const router = express.Router();

router.post("/request", requestPasswordReset);

router.post("/reset", resetPassword);

router.post("/verify/:token", verifyResetToken);

module.exports = router;
