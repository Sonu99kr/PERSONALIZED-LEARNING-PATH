import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LearningPathCurve from "./LearningPathCurve";
import ProgressBar from "./ProgressBar";
import { AuthContext } from "../../Context/authContext";
import "./Dashboard.css";

function Dashboard() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [learningPath, setLearningPath] = useState([]);
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete 5 courses this month",
      progress: 60,
      target: 5,
      current: 3,
    },
    {
      id: 2,
      title: "Achieve Intermediate level",
      progress: 75,
      target: 100,
      current: 75,
    },
    {
      id: 3,
      title: "Study for 2 hours daily",
      progress: 40,
      target: 100,
      current: 40,
    },
  ]);
  const [quickActions] = useState([
    { id: 1, title: "Continue Learning", icon: "📚", action: "resume" },
    { id: 2, title: "Take Assessment", icon: "📝", action: "assessment" },
    { id: 3, title: "Browse Roadmaps", icon: "🗺️", action: "roadmaps" },
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
            axios.get("http://localhost:3002/api/user/learning-path", {
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
        navigate("/assessment");
        break;
      case "roadmaps":
        navigate("/roadmaps");
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
  if (!userStats || Object.keys(userStats).length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back</h1>
          <p>Let's continue your learning journey</p>
        </div>
        <div className="header-actions">
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
            <div className="stat-icon">🏆</div>
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
            <ProgressBar
              progress={Math.round(
                (userStats.completedCourses / userStats.totalCourses) * 100
              )}
              color="#4CAF50"
            />
          </div>
          <div className="content-card learning-path-section">
            <h2>Learning Path</h2>
            <LearningPathCurve
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
            <h2>Recent Activity</h2>
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

          <div className="content-card goals-section">
            <h2>Your Goals</h2>
            <div className="goals-list">
              {goals.map((goal) => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-header">
                    <h3 className="goal-title">{goal.title}</h3>
                    <span className="goal-progress-text">{goal.progress}%</span>
                  </div>
                  <div className="goal-progress-bar">
                    <div
                      className="goal-progress-fill"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="goal-stats">
                    <span>
                      {goal.current} / {goal.target}
                    </span>
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
