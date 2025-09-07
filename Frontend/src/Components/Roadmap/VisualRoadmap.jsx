import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VisualRoadmap.css";

function VisualRoadmap() {
  const { id: roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const svgRef = useRef(null);

  useEffect(() => {
    if (roadmapId) {
      console.log("Fetching roadmap with ID:", roadmapId);
      fetchRoadmap();
    } else {
      console.error("No roadmap ID found in URL");
      setLoading(false);
    }
  }, [roadmapId]);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3002/api/roadmaps/${roadmapId}`
      );
      setRoadmap(response.data);

      // Fetch user progress
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const progressResponse = await axios.get(
            `http://localhost:3002/api/user-roadmaps/${localStorage.getItem(
              "userId"
            )}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserProgress(progressResponse.data);
        } catch (error) {
          console.log("No user progress found");
        }
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };

  const markStepComplete = async (stepId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3002/api/user-roadmaps/update-steps",
        { stepId, completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserProgress((prev) => ({
        ...prev,
        [stepId]: { completed: true, completedAt: new Date() },
      }));
    } catch (error) {
      console.error("Error updating step:", error);
    }
  };

  const renderRoadmapSVG = () => {
    if (!roadmap || !roadmap.steps) return null;

    const width = 800;
    const height = 600;
    const stepWidth = 120;
    const stepHeight = 80;
    const padding = 40;

    return (
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="roadmap-svg"
      >
        {/* Render connections first (behind steps) */}
        {roadmap.steps.map((step, index) => {
          if (!step.connections || step.connections.length === 0) return null;

          return step.connections.map((connectionId, connIndex) => {
            const connectedStep = roadmap.steps.find(
              (s) => s.id === connectionId
            );
            if (!connectedStep) return null;

            const startX = step.position?.x || index * 150 + padding;
            const startY = step.position?.y || 100;
            const endX =
              connectedStep.position?.x ||
              roadmap.steps.findIndex((s) => s.id === connectionId) * 150 +
                padding;
            const endY = connectedStep.position?.y || 100;

            return (
              <line
                key={`${step.id}-${connectionId}-${connIndex}`}
                x1={startX + stepWidth / 2}
                y1={startY + stepHeight / 2}
                x2={endX + stepWidth / 2}
                y2={endY + stepHeight / 2}
                stroke="#e5e7eb"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          });
        })}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#e5e7eb" />
          </marker>
        </defs>

        {/* Render steps */}
        {roadmap.steps.map((step, index) => {
          const x = step.position?.x || index * 150 + padding;
          const y = step.position?.y || 100;
          const isCompleted = userProgress[step.id]?.completed;
          const isSelected = selectedStep?.id === step.id;

          return (
            <g key={step.id}>
              <rect
                x={x}
                y={y}
                width={stepWidth}
                height={stepHeight}
                rx="8"
                fill={
                  isCompleted ? "#10b981" : isSelected ? "#3b82f6" : "#ffffff"
                }
                stroke={
                  isCompleted ? "#059669" : isSelected ? "#2563eb" : "#d1d5db"
                }
                strokeWidth={isSelected ? "3" : "2"}
                className="roadmap-step"
                onClick={() => handleStepClick(step)}
                style={{ cursor: "pointer" }}
              />

              {/* Step content */}
              <text
                x={x + stepWidth / 2}
                y={y + 25}
                textAnchor="middle"
                className="step-title"
                fill={isCompleted ? "#ffffff" : "#374151"}
                fontSize="12"
                fontWeight="600"
              >
                {step.title}
              </text>

              <text
                x={x + stepWidth / 2}
                y={y + 45}
                textAnchor="middle"
                className="step-difficulty"
                fill={isCompleted ? "#ffffff" : "#6b7280"}
                fontSize="10"
              >
                {step.difficulty}
              </text>

              {/* Completion checkmark */}
              {isCompleted && (
                <text
                  x={x + stepWidth - 15}
                  y={y + 20}
                  className="completion-check"
                  fill="#ffffff"
                  fontSize="16"
                >
                  ✓
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="roadmap-loading">
        <div className="loading-spinner"></div>
        <p>Loading roadmap...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="roadmap-error">
        <h3>Roadmap not found</h3>
        <p>Please check the roadmap ID and try again.</p>
      </div>
    );
  }

  return (
    <div className="visual-roadmap-container">
      {/* Roadmap Header */}
      <div className="roadmap-header">
        <div className="roadmap-title">
          <span className="roadmap-icon">{roadmap.icon}</span>
          <h1>{roadmap.title}</h1>
        </div>
        <div className="roadmap-meta">
          <span className="roadmap-category">{roadmap.category}</span>
          <span className="roadmap-difficulty">{roadmap.difficulty}</span>
          <span className="roadmap-time">{roadmap.estimatedTime}</span>
        </div>
        <p className="roadmap-description">{roadmap.description}</p>
      </div>

      {/* Visual Roadmap */}
      <div className="roadmap-visual">{renderRoadmapSVG()}</div>

      {/* Step Details Panel */}
      {selectedStep && (
        <div className="step-details-panel">
          <div className="step-details-header">
            <h3>{selectedStep.title}</h3>
            <button className="close-btn" onClick={() => setSelectedStep(null)}>
              ×
            </button>
          </div>

          <div className="step-details-content">
            <p className="step-description">{selectedStep.description}</p>

            <div className="step-meta">
              <div className="meta-item">
                <strong>Difficulty:</strong> {selectedStep.difficulty}
              </div>
              <div className="meta-item">
                <strong>Estimated Time:</strong> {selectedStep.estimatedTime}
              </div>
            </div>

            {selectedStep.prerequisites &&
              selectedStep.prerequisites.length > 0 && (
                <div className="prerequisites">
                  <h4>Prerequisites:</h4>
                  <ul>
                    {selectedStep.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}

            {selectedStep.resources && selectedStep.resources.length > 0 && (
              <div className="resources">
                <h4>Learning Resources:</h4>
                <div className="resource-list">
                  {selectedStep.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      <span className="resource-type">{resource.type}</span>
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="step-actions">
              <button
                className="complete-btn"
                onClick={() => markStepComplete(selectedStep.id)}
                disabled={userProgress[selectedStep.id]?.completed}
              >
                {userProgress[selectedStep.id]?.completed
                  ? "Completed ✓"
                  : "Mark as Complete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisualRoadmap;
