import React from "react";

function LearningPathCurve({ completedCourses = 0, totalCourses = 1 }) {
  const progress = (completedCourses / totalCourses) * 100;
  const steps = [
    { label: "Beginner", threshold: 0 },
    { label: "Intermediate", threshold: 25 },
    { label: "Advanced", threshold: 50 },
    { label: "Expert", threshold: 75 },
    { label: "Master", threshold: 100 },
  ];

  return (
    <div className="learning-path-curve">
      <div className="curve-container">
        <svg viewBox="0 0 400 100" className="curve-svg">
          <path
            d="M 20 80 Q 100 60 200 40 T 380 20"
            stroke="#e0e0e0"
            strokeWidth="3"
            fill="none"
            className="curve-background"
          />
          <path
            d={`M 20 80 Q 100 60 200 40 T 380 20`}
            stroke="#4CAF50"
            strokeWidth="4"
            fill="none"
            className="curve-progress"
            style={{
              strokeDasharray: "400",
              strokeDashoffset: `${400 - (progress / 100) * 400}`,
            }}
          />
        </svg>

        <div className="curve-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`curve-step ${
                progress >= step.threshold ? "completed" : ""
              }`}
              style={{ left: `${(step.threshold / 100) * 90}%` }}
            >
              <div className="step-dot">
                {progress >= step.threshold ? "✓" : ""}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-info">
        <span className="current-progress">
          {completedCourses} of {totalCourses} courses completed
        </span>
      </div>
    </div>
  );
}

export default LearningPathCurve;
