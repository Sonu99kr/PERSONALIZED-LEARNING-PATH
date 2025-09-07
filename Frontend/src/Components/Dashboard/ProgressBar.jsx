import React from "react";

function ProgressBar({ progress = 0, color = "#4CAF50", height = "8px" }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: color,
            height: height,
          }}
        />
      </div>
      <div className="progress-text">{Math.round(progress)}% Complete</div>
    </div>
  );
}

export default ProgressBar;
