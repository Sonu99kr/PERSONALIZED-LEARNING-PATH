import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RoadmapSelector.css";

function RoadmapSelector() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "DevOps",
    "Mobile",
    "Data Science",
    "AI/ML",
    "Design",
  ];

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3002/api/roadmaps");
      setRoadmaps(response.data);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRoadmaps =
    selectedCategory === "All"
      ? roadmaps
      : roadmaps.filter((roadmap) => roadmap.category === selectedCategory);

  const handleRoadmapSelect = (roadmapId) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#10b981";
      case "Intermediate":
        return "#f59e0b";
      case "Advanced":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Frontend: "🎨",
      Backend: "⚙️",
      DevOps: "🚀",
      Mobile: "📱",
      "Data Science": "📊",
      "AI/ML": "🤖",
      Design: "🎯",
      Other: "📚",
    };
    return icons[category] || "📚";
  };

  if (loading) {
    return (
      <div className="roadmap-selector-loading">
        <div className="loading-spinner"></div>
        <p>Loading roadmaps...</p>
      </div>
    );
  }

  return (
    <div className="roadmap-selector-container">
      {/* Header */}
      <div className="selector-header">
        <h1>Choose Your Learning Path</h1>
        <p>Select a roadmap to start your personalized learning journey</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category !== "All" && (
              <span className="category-icon">{getCategoryIcon(category)}</span>
            )}
            {category}
          </button>
        ))}
      </div>

      {/* Roadmaps Grid */}
      <div className="roadmaps-grid">
        {filteredRoadmaps.map((roadmap) => (
          <div
            key={roadmap._id}
            className="roadmap-card"
            onClick={() => handleRoadmapSelect(roadmap._id)}
            style={{ "--roadmap-color": roadmap.color }}
          >
            <div className="roadmap-card-header">
              <div className="roadmap-icon">{roadmap.icon}</div>
              <div className="roadmap-category">{roadmap.category}</div>
            </div>

            <div className="roadmap-card-content">
              <h3 className="roadmap-title">{roadmap.title}</h3>
              <p className="roadmap-description">{roadmap.description}</p>

              <div className="roadmap-meta">
                <div className="meta-item">
                  <span className="meta-label">Difficulty:</span>
                  <span
                    className="meta-value difficulty"
                    style={{ color: getDifficultyColor(roadmap.difficulty) }}
                  >
                    {roadmap.difficulty}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Duration:</span>
                  <span className="meta-value">{roadmap.estimatedTime}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Steps:</span>
                  <span className="meta-value">
                    {roadmap.steps?.length || 0}
                  </span>
                </div>
              </div>

              <div className="roadmap-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "0%" }}></div>
                </div>
                <span className="progress-text">Not Started</span>
              </div>
            </div>

            <div className="roadmap-card-footer">
              <button className="start-btn">
                Start Learning
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRoadmaps.length === 0 && (
        <div className="no-roadmaps">
          <h3>No roadmaps found</h3>
          <p>
            Try selecting a different category or check back later for new
            roadmaps.
          </p>
        </div>
      )}
    </div>
  );
}

export default RoadmapSelector;
