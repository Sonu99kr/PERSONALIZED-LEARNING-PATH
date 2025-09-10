const User = require("../Models/Users");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

async function handleUserRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email is already used" });
    const newUser = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      message: "User created Successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const token = setUser(user);
    return res.json({
      message: "Login Successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function handleUserLogout(req, res) {
  res.json({ message: "Logged out Successfully" });
}

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  setUser,
};
