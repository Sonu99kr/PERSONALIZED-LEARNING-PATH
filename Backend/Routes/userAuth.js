const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
} = require("../Controllers/Auth");

const router = express.Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);

module.exports = router;
