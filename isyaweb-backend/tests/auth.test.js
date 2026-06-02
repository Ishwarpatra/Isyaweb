const request = require('supertest');
const app = require('../app');
const db = require('../db');
const bcrypt = require('bcryptjs');

// Mock database connection pool and query interface
jest.mock('../db', () => ({
  query: jest.fn(),
  pool: {
    query: jest.fn().mockResolvedValue({}),
    on: jest.fn(),
    end: jest.fn()
  }
}));

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should validate missing input fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: '', password: '', name: '' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('VALIDATION_ERROR');
    });

    it('should reject invalid email formats', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'bademail', password: 'password123', name: 'Agent' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('valid email coordinates');
    });

    it('should enforce password length constraints', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'agent@isya.space', password: 'short', name: 'Agent' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('at least 8 characters');
    });

    it('should register a new user successfully when valid', async () => {
      // Mock email uniqueness query returning zero matches
      db.query.mockResolvedValueOnce({ rows: [] })
        // Mock insert query returning user profile
        .mockResolvedValueOnce({
          rows: [{ id: 10, email: 'agent@isya.space', name: 'Agent Smith', role: 'user' }]
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'agent@isya.space', password: 'password123', name: 'Agent Smith' });

      expect(res.status).toBe(201);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe('agent@isya.space');
      expect(res.body.token).toBeDefined();
      expect(res.headers['set-cookie']).toBeDefined();
      expect(res.headers['set-cookie'][0]).toContain('token=');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should authenticate user with valid credentials', async () => {
      const passwordHash = await bcrypt.hash('password123', 10);
      db.query.mockResolvedValueOnce({
        rows: [{ id: 2, email: 'cadet@isya.space', password_hash: passwordHash, name: 'Cadet Chen', role: 'user' }]
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'cadet@isya.space', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.name).toBe('Cadet Chen');
      expect(res.body.token).toBeDefined();
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should reject invalid passwords', async () => {
      const passwordHash = await bcrypt.hash('password123', 10);
      db.query.mockResolvedValueOnce({
        rows: [{ id: 2, email: 'cadet@isya.space', password_hash: passwordHash, name: 'Cadet Chen', role: 'user' }]
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'cadet@isya.space', password: 'wrongpassword' });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Incorrect email or security passphrase');
    });
  });
});
