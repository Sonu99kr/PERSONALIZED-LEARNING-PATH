import React from "react";

function Results({ results, onRetake, onNewTopic }) {
  const { score, total, feedback } = results;
  const percentage = Math.round((score / total) * 100);

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "Excellent! Outstanding performance!";
    if (percentage >= 80) return "Great job! Well done!";
    if (percentage >= 70) return "Good work! Keep it up!";
    if (percentage >= 60) return "Not bad! Room for improvement.";
    return "Keep studying! You can do better!";
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Quiz Results</h2>
        <div className="score-summary">
          <div
            className="score-circle"
            style={{ borderColor: getScoreColor(percentage) }}
          >
            <span className="score-percentage">{percentage}%</span>
            <span className="score-fraction">
              {score}/{total}
            </span>
          </div>
          <p
            className="score-message"
            style={{ color: getScoreColor(percentage) }}
          >
            {getScoreMessage(percentage)}
          </p>
        </div>
      </div>

      <div className="detailed-feedback">
        <h3>Question Review</h3>
        <div className="feedback-list">
          {feedback.map((item, index) => (
            <div
              key={index}
              className={`feedback-item ${
                item.isCorrect ? "correct" : "incorrect"
              }`}
            >
              <div className="feedback-question">
                <span className="question-number">Q{index + 1}:</span>
                <span className="question-text">{item.question}</span>
              </div>

              <div className="feedback-answers">
                <div className="answer-row">
                  <span className="answer-label">Your Answer:</span>
                  <span
                    className={`user-answer ${
                      item.isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    {item.userAnswer || "Not answered"}
                  </span>
                </div>

                {!item.isCorrect && (
                  <div className="answer-row">
                    <span className="answer-label">Correct Answer:</span>
                    <span className="correct-answer">{item.correctAnswer}</span>
                  </div>
                )}
              </div>

              <div className="feedback-status">
                {item.isCorrect ? (
                  <span className="status-correct">✓ Correct</span>
                ) : (
                  <span className="status-incorrect">✗ Incorrect</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="action-btn retake-btn" onClick={onRetake}>
          Retake Same Quiz
        </button>
        <button className="action-btn new-topic-btn" onClick={onNewTopic}>
          Try Different Topic
        </button>
      </div>

      <div className="results-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Correct Answers:</span>
            <span className="stat-value correct">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Incorrect Answers:</span>
            <span className="stat-value incorrect">{total - score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Questions:</span>
            <span className="stat-value">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
