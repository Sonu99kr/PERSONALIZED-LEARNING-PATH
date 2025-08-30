import React, { useState, useContext, useEffect } from "react";
import learningPathCurve from "./LearningPathCurve";
import pgogressBar from "./ProgressBar";
import { AuthContext } from "../../Context/authContext";

function Dashboard() {
  const [logout, isAuthenticated] = useContext(AuthContext);
  const [userStats, setUserStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [learningPath, setLearningPath] = useState([]);
  const [quickActions] = useState([
    { id: 1, title: "Continue Learning", icon: "📚", action: "resume" },
    { id: 2, title: "Take Assessment", icon: "📝", action: "assessment" },
    { id: 3, title: "View Roadmap", icon: "🗺️", action: "roadmap" },
    { id: 4, title: "Join Community", icon: "👥", action: "community" },
  ]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const token = localStorage.item("token");

        const [statsRes, recentActivityRes, learningPathRes] =
          await Promise.all([
            axios.get("/api/user/stats", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("/api/user/recent-activity", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("api/user/learningPath", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        setUserStats(statsRes.data);
        setRecentActivity(activityRes.data);
        setLearningPath(pathRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handlequickActions = (action) => {
    switch (action) {
      case "resume":
        console.log("Resuming learning...");
        break;
      case "assessment":
        console.log("Starting assessment...");
        break;
      case "roadmap":
        console.log("Opening roadmap...");
        break;
      case "community":
        console.log("Joining community...");
        break;
      default:
        break;
    }
  };

  const handleLogut = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard</div>;
  }

  return <div>hello</div>;
}

export default Dashboard;
