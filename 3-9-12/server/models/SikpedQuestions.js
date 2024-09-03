class SkippedQuestions {
  constructor() {
    this.questions = [];
    this.answers = [];
  }

  // Add Question to Questions From Endpoint /skippedQuestions
  addQuestions(question) {
    this.questions.append(question);
  }

  // Store the user's answer for a specific question
  submitAnswer(questionIndex, answer) {
    this.answers[questionIndex] = answer;
    console.log(answer);
  }

  // Calculate the percentage of correct answers
  calculateScore() {
    let correctAnswers = 0;
    this.questions.forEach((question, index) => {
      if (question.correctAnswer === question.answers[this.answers[index]]) {
        correctAnswers++;
      }
    });
    return (correctAnswers / this.selectedQuestions.length) * 100;
  }

  // Return the selected questions to the frontend
  getQuestions() {
    return this.questions.map(({ question, answers }) => ({
      question,
      answers,
    }));
  }
}

module.exports = SkippedQuestions;
