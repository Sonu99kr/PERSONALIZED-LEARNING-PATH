import authApi from "./authApi";

const assessmentApi = {
  // Generate quiz for a specific topic
  generateQuiz: async (topic) => {
    try {
      const response = await authApi.post(
        "http://localhost:3002/api/assessment",
        { topic }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to generate quiz");
    }
  },

  // Submit quiz answers and get results
  submitQuiz: async (answers) => {
    try {
      const response = await authApi.post(
        "http://localhost:3002/api/assessment/submit",
        { answers }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to submit quiz");
    }
  },
};

export default assessmentApi;
