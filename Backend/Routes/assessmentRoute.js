const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const middlewareAuth = require("../Middleware/middlewareAuth");

const router = express.Router();
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let currentQuiz = [];

router.post("/", async (req, res) => {
  const { topic } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate 10 multiple-choice questions on ${topic}.
    Return ONLY valid JSON. Do not include any explanations or markdown code fences.
    [
      {
        "question": "What is React?",
        "options": ["A. Library", "B. Framework", "C. Language", "D. Database"],
        "correctAnswer": "A. Library"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let quiz;
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      quiz = JSON.parse(cleaned);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to parse Gemini response", raw: text });
    }
    currentQuiz = quiz;
    return res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/submit", async (req, res) => {
  const { answers } = req.body;

  if (!currentQuiz.length) {
    return res.status(400).json({ error: "No quiz found. Generate first!" });
  }

  let score = 0;
  let feedback = [];

  currentQuiz.forEach((q, index) => {
    const isCorrect = q.correctAnswer === answers[index];
    if (isCorrect) score++;

    feedback.push({
      question: q.question,
      correctAnswer: q.correctAnswer,
      userAnswer: answers[index],
      isCorrect,
    });
  });
  return res.json({ score, total: currentQuiz.length, feedback });
});

module.exports = router;
