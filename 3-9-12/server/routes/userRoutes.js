const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
// const SkippedQuestions = require("../models/SkippedQuestions");
const router = express.Router();
const emailValidator = require('email-validator');

// const skippedQuestions = new SkippedQuestions();

router.get('/quiz', (req, res) => {
  const quiz = new Quiz();
  res.json(quiz.getSelectedQuestions());
});

router.post('/quiz/submit', (req, res) => {
  const { answers } = req.body;
  const quiz = new Quiz();

  answers.forEach((answer, index) => {
    quiz.submitAnswer(index, answer);
  });

  const score = quiz.calculateScore();
  res.json({ score });
});

// Sign-up route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Backend validation for email format
  if (!emailValidator.validate(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Backend validation for password length
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      enterExamBefore: false,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // If login is successful, send a success response
      res.status(200).json({ message: 'Login successful', user});
  } catch (error) {
        console.error("Error occurred during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to update `enterExamBefore`
router.post('/update-enter-exam-before', async (req, res) => {
  const { email } = req.body; // Assume you pass the user's email in the request

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.enterExamBefore = true; // Update the field
    await user.save(); // Save the changes
    return res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// router.post('/addSpikedQuestions', async (res, req) => {
//   skippedQuestions.addQuestions(req.body.question);
// })

module.exports = router;