const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const roadmapRoutes = require("./Routes/roadmapRoutes");
const userRoadmapRoutes = require("./Routes/userRoadmapRoutes");
const dashboardRoute = require("./Routes/dashboardRoute");
const profile = require("./Routes/profile");
const userRoute = require("./Routes/userAuth");
const authRoute = require("./Routes/auth");
const passwordResetRoute = require("./Routes/resetPassword");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", userRoute);
app.use("/api/password-reset", passwordResetRoute);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/user-roadmaps", userRoadmapRoutes);
app.use("/api/user", dashboardRoute, profile);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`server is running ${PORT}`));
