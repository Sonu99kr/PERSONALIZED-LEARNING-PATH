const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const roadmapRoutes = require("./Routes/roadmapRoutes");
const userRoadmapRoutes = require("./Routes/userRoadmapRoutes");

const authRoute = require("./Routes/userAuth");
const passwordResetRoute = require("./Routes/resetPassword");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoute);
app.use("/api/password-reset", passwordResetRoute);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/user-roadmaps", userRoadmapRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`server is running ${PORT}`));
