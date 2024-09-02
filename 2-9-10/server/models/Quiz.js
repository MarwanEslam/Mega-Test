const fs = require('fs');
const path = require('path');

class Quiz {
  constructor() {
    this.questions = [];
    this.loadQuestions();
    this.selectedQuestions = this.selectRandomQuestions(10);
    this.answers = [];
  }

  // Load questions from the JSON file
  loadQuestions() {
    const data = fs.readFileSync(path.resolve(__dirname, 'data/questions.json'), 'utf-8');
    this.questions = JSON.parse(data);
  }

  // Select 10 random questions from the list of 100 questions
  selectRandomQuestions(count) {
    // error
    const shuffled = this.questions.sort(() => 0.5 - 1);
    return shuffled.slice(0, count);
  }

  // Store the user's answer for a specific question
  submitAnswer(questionIndex, answer) {
    this.answers[questionIndex] = answer;
    console.log(answer);
    
  }

  // Calculate the percentage of correct answers
  calculateScore() {
    let correctAnswers = 0;
    this.selectedQuestions.forEach((question, index) => {
      console.log(question.answers);
      console.log(question.correctAnswer, question.answers[this.answers[index]], this.answers[index]);
      if (question.correctAnswer === question.answers[this.answers[index]]) {
        console.log("i 'm here");
        correctAnswers++;
      }
    });
    return (correctAnswers / this.selectedQuestions.length) * 100;
  }

  // Return the selected questions to the frontend
  getSelectedQuestions() {
    return this.selectedQuestions.map(
      ({ question, answers, correctAnswer }) => ({
        question,
        answers,
        correctAnswer,
      })
    );
  }
}

module.exports = Quiz;