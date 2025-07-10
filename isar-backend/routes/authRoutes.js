const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  sendVerificationCode,
  enrollCourse,
  getUserCourses,
  sendOtp,
  resetPasswordWithOtp
} = require('../controllers/authController');

// ✅ POST: Authentication
router.post('/register', registerUser);
router.get('/register', (req, res) => {
  res.send('✅ This is the REGISTER route. Use POST to register a user.');
});

router.post('/login', loginUser);
router.get('/login', (req, res) => {
  res.send('✅ This is the LOGIN route. Use POST to log in.');
});

// ✅ POST: Email Verification
router.post('/send-code', sendVerificationCode);
router.get('/send-code', (req, res) => {
  res.send('✅ This is the SEND-CODE route. Use POST to send verification code.');
});

// ✅ POST: Enrollment
router.post('/enroll', enrollCourse);
router.get('/enroll', (req, res) => {
  res.send('✅ This is the ENROLL route. Use POST to enroll in a course.');
});

// ✅ GET: Fetch Enrolled Courses
router.get('/courses/:id', getUserCourses);

// ✅ POST: OTP & Password Reset
router.post('/send-otp', sendOtp);
router.get('/send-otp', (req, res) => {
  res.send('✅ This is the SEND-OTP route. Use POST to send OTP.');
});

router.post('/reset-with-otp', resetPasswordWithOtp);
router.get('/reset-with-otp', (req, res) => {
  res.send('✅ This is the RESET-WITH-OTP route. Use POST to reset password.');
});

module.exports = router;
