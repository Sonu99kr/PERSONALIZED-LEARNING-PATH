import React, { useState } from "react";
import assessmentApi from "../../Api/assessmentApi";
import QuizInterface from "./QuizInterface";
import Results from "./Results";
import "./Assessment.css";

function Assessment() {
  const [currentStep, setCurrentStep] = useState("topic-selection"); // topic-selection, quiz, results
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await assessmentApi.generateQuiz(topic.trim());
      setQuiz(response.quiz);
      setCurrentStep("quiz");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = async (answers) => {
    setLoading(true);
    try {
      const response = await assessmentApi.submitQuiz(answers);
      setResults(response);
      setCurrentStep("results");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentStep("topic-selection");
    setTopic("");
    setQuiz(null);
    setResults(null);
    setError("");
  };

  const handleNewTopic = () => {
    setCurrentStep("topic-selection");
    setTopic("");
    setQuiz(null);
    setResults(null);
    setError("");
  };

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h1>Knowledge Assessment</h1>
        <p>Test your knowledge on any topic with AI-generated questions</p>
      </div>

      {currentStep === "topic-selection" && (
        <div className="topic-selection">
          <form onSubmit={handleTopicSubmit} className="topic-form">
            <div className="form-group">
              <label htmlFor="topic">Enter a topic to be assessed on:</label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., React, JavaScript, Machine Learning, History..."
                className="topic-input"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="generate-btn"
              disabled={loading || !topic.trim()}
            >
              {loading ? "Generating Quiz..." : "Generate Quiz"}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}

      {currentStep === "quiz" && quiz && (
        <QuizInterface
          quiz={quiz}
          onComplete={handleQuizComplete}
          onBack={handleNewTopic}
          loading={loading}
        />
      )}

      {currentStep === "results" && results && (
        <Results
          results={results}
          onRetake={handleRetakeQuiz}
          onNewTopic={handleNewTopic}
        />
      )}
    </div>
  );
}

export default Assessment;
