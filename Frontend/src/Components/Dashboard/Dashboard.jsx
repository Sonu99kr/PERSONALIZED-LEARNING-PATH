import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import learningPathCurve from "./LearningPathCurve";
import progressBar from "./ProgressBar";
import { AuthContext } from "../../Context/authContext";

function Dashboard() {
  const { logout, isAuthenticated } = useContext(AuthContext);
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
        const token = localStorage.getItem("token");

        const [statsRes, recentActivityRes, learningPathRes] =
          await Promise.all([
            axios.get("http://localhost:3002/api/user/stats", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3002/api/user/recent-activity", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3002/api/user/learningPath", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        setUserStats(statsRes.data);
        setRecentActivity(recentActivityRes.data);
        setLearningPath(learningPathRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handleQuickAction = (action) => {
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

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard</div>;
  }
  if (!userStats) {
    return <div>Loadig Dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back</h1>
          <p>Let's continue your learning journey</p>
        </div>
        <div header-actions>
          <button className="profile-btn">
            <span className="profile-avatar">👤</span>
            <span>Profile</span>
          </button>
          <button className="logoutBtn" onClick={handleLogout}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </header>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>
                {userStats.completedCourses}/{userStats.totalCourses}
              </h3>
              <p>Courses Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="statc-icon">🏆</div>
            <div className="stat-content">
              <h3>{userStats.level}</h3>
              <p>Current Level</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <p>
                <strong>Next Milestone:</strong> {userStats.nextMilestone}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="main-content">
        <div className="content-grid">
          <div className="content-card progress-selection">
            <h2>your progress</h2>
            <progressBar
              progress={Math.round(
                (userStats.completedCourses / userStats.totalCourses) * 100
              )}
              color="#4CAF50"
            />
          </div>
          <div className="content-card learning-path-section">
            <h2>Learning Path</h2>
            <learningPathCurve
              completedCourses={userStats.completedCourses}
              totalCourses={userStats.totalCourses}
            />
            <ul>
              {learningPath.map((step, index) => (
                <li
                  key={index}
                  style={{
                    textDecoration: step.completed ? "line-through" : "none",
                  }}
                >
                  {step.title} {step.completed ? "✅" : ""}
                </li>
              ))}
            </ul>
          </div>

          <div className="content-card quick-actions-section">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-title">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="content-card activity-sections">
            <h2>Recent Acticity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className={`activity-item ${activity.type}`}>
                  <div className="activity-icon">
                    {activity.type === "completed" && "✅"}
                    {activity.type === "started" && "🚀"}
                    {activity.type === "achievement" && "🏆"}
                  </div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-time">
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
