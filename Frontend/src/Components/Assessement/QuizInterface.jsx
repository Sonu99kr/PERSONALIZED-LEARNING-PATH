import React, { useState } from "react";

function QuizInterface({ quiz, onComplete, onBack, loading }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(quiz.length).fill(""));
  const [showSubmit, setShowSubmit] = useState(false);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    const allAnswered = newAnswers.every((answer) => answer !== "");
    setShowSubmit(allAnswered);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  const currentQ = quiz[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.length) * 100;

  return (
    <div className="quiz-interface">
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {quiz.length}
          </span>
        </div>
        <button className="back-btn" onClick={onBack}>
          ← Back to Topic Selection
        </button>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQ.question}</h2>

        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <label
              key={index}
              className={`option-label ${
                answers[currentQuestion] === option ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswerSelect(option)}
                className="option-input"
              />
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <div className="nav-buttons">
          <button
            className="nav-btn prev-btn"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          {currentQuestion < quiz.length - 1 ? (
            <button
              className="nav-btn next-btn"
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              Next
            </button>
          ) : (
            <button
              className="nav-btn submit-btn"
              onClick={handleSubmit}
              disabled={!showSubmit || loading}
            >
              {loading ? "Submitting..." : "Submit Quiz"}
            </button>
          )}
        </div>
      </div>

      <div className="question-indicators">
        {quiz.map((_, index) => (
          <button
            key={index}
            className={`indicator ${
              index === currentQuestion ? "active" : ""
            } ${answers[index] ? "answered" : ""}`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizInterface;
