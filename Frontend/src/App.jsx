import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import Dashboard from "./Components/Dashboard/Dashboard";
import RoadmapSelector from "./Components/Roadmap/RoadmapSelector";
import VisualRoadmap from "./Components/Roadmap/VisualRoadmap";
import PrivateRoute from "./util/PrivateRoute";
import Assessement from "./Components/Assessement/Assessement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/roadmaps"
          element={
            <PrivateRoute>
              <RoadmapSelector />
            </PrivateRoute>
          }
        />
        <Route
          path="/roadmap/:id"
          element={
            <PrivateRoute>
              <VisualRoadmap />
            </PrivateRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <PrivateRoute>
              <Assessement />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
