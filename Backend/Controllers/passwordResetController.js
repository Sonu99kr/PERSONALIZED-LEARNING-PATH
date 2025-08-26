const User = require("../Models/Users");
const passwordReset = require("../Models/passwordReset");
const { sendPasswordResetMail } = require("../Service/emailService");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    await passwordReset.create({
      email,
      token: resetToken,
      expiresAt: new Date(Date.now() + 3600000),
    });

    const emailSent = await sendPasswordResetMail(email, resetToken);
    if (emailSent) {
      return res.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    } else {
      return res.status(500).json({ error: "Failed to send Email" });
    }
  } catch (error) {
    console.error("Password reset request error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "'Token and new password are required'" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    const resetRecord = await passwordReset.findOne({
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email: resetRecord.email },
      { password: hashedPassword }
    );

    await passwordReset.deleteOne({ _id: resetRecord._id });

    return res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const resetRecord = await passwordReset.findOne({
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.json({ error: "Invalid or expired reset token" });
    }

    return res.json({ message: "Token is valid" });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword,
  verifyResetToken,
};
