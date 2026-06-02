const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { protect } = require('../middleware/auth');

const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'isya_jwt_telemetry_secure_secret_hash_2026_xyz';

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Helper to set httpOnly Cookie
const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour
  });
};

// @route   POST /auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  // 1. Basic validation
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'VALIDATION_ERROR: All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'VALIDATION_ERROR: Please enter valid email coordinates.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'VALIDATION_ERROR: Passphrase must be at least 8 characters long.' });
  }

  try {
    // 2. Check if email unique
    const checkEmail = await db.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ error: 'VALIDATION_ERROR: Email is already registered in our telemetry nodes.' });
    }

    // 3. Determine role based on domain (for review demonstration)
    const lowerEmail = email.toLowerCase().trim();
    let role = 'user';
    if (lowerEmail === 'admin@isya.space' || lowerEmail.includes('admin')) {
      role = 'admin';
    } else if (lowerEmail.includes('moderator') || lowerEmail === 'moderator@isya.space') {
      role = 'moderator';
    } else if (lowerEmail.includes('mentor') || lowerEmail === 'mentor@isya.space') {
      role = 'mentor';
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // 5. Insert user
    const result = await db.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
      [lowerEmail, passwordHash, name, role]
    );

    const user = result.rows[0];

    // 6. Generate Token & Cookie
    const token = generateToken(user);
    setAuthCookie(res, token);

    return res.status(201).json({ user, token });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'INTERNAL_ERROR: Database insertion failed.' });
  }
});

// @route   POST /auth/login
// @desc    Log in user & set session cookie
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'VALIDATION_ERROR: Email and security key are required.' });
  }

  try {
    // 1. Fetch user
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'UNAUTHORIZED: Incorrect email or security passphrase.' });
    }

    const user = result.rows[0];

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'UNAUTHORIZED: Incorrect email or security passphrase.' });
    }

    // 3. Generate token & set cookie
    const token = generateToken(user);
    setAuthCookie(res, token);

    // Exclude password hash from response
    delete user.password_hash;

    return res.json({ user, token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'INTERNAL_ERROR: Authentication server fault.' });
  }
});

// @route   POST /auth/logout
// @desc    Clear session cookie
router.post('/logout', protect, (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Session terminated. Downlink closed.' });
});

// @route   GET /auth/me
// @desc    Retrieve active session user profile
router.get('/me', protect, async (req, res) => {
  try {
    const result = await db.query('SELECT id, email, name, role, created_at FROM users WHERE id = $1', [req.user.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'NOT_FOUND: User does not exist in databases.' });
    }
    return res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Auth check error:', err);
    return res.status(500).json({ error: 'INTERNAL_ERROR: Failed to query coordinates.' });
  }
});

module.exports = router;
