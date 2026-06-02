const request = require('supertest');
const app = require('../app');
const db = require('../db');
const jwt = require('jsonwebtoken');

// Mock database connection pool and query interface
jest.mock('../db', () => ({
  query: jest.fn(),
  pool: {
    query: jest.fn().mockResolvedValue({}),
    on: jest.fn(),
    end: jest.fn()
  }
}));

const JWT_SECRET = 'isya_jwt_telemetry_secure_secret_hash_2026_xyz';

describe('Blogs Endpoints', () => {
  let mockToken;

  beforeAll(() => {
    mockToken = jwt.sign(
      { userId: 10, email: 'cadet@isya.space', name: 'Cadet Chen', role: 'user' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup SQL text matches mock implementation
    db.query.mockImplementation((sql, params) => {
      const lowerSql = sql.toLowerCase();
      
      if (lowerSql.includes('update blog_posts')) {
        return Promise.resolve({ rows: [] });
      }
      
      if (lowerSql.includes('count(bp.id)')) {
        return Promise.resolve({ rows: [{ total: '3' }] });
      }
      
      if (lowerSql.includes('select bp.id, bp.title')) {
        return Promise.resolve({
          rows: [
            { id: 1, title: 'ESA YGT Selection', category: 'MISSION_UPDATE', author_name: 'Cadet Chen' },
            { id: 2, title: 'Exoplanets 101', category: 'RESEARCH', author_name: 'David Osei' }
          ]
        });
      }
      
      if (lowerSql.includes('select bp.*')) {
        return Promise.resolve({
          rows: [{ id: 1, title: 'ESA YGT Selection', content: 'Details...', author_name: 'Cadet Chen' }]
        });
      }
      
      if (lowerSql.includes('select c.id, c.content')) {
        return Promise.resolve({
          rows: [{ id: 100, content: 'Congrats!', author_name: 'Sarah Chen' }]
        });
      }
      
      if (lowerSql.includes('select id from blog_posts')) {
        return Promise.resolve({ rows: [{ id: 1 }] });
      }
      
      if (lowerSql.includes('insert into comments')) {
        return Promise.resolve({
          rows: [{ id: 45, content: 'Space rocks!', created_at: new Date().toISOString() }]
        });
      }
      
      return Promise.resolve({ rows: [] });
    });
  });

  describe('GET /api/blogs', () => {
    it('should return paginated blog list structures', async () => {
      const res = await request(app).get('/api/blogs?page=1&limit=2');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.pagination.total).toBe(3);
      expect(res.body.pagination.pages).toBe(2);
    });
  });

  describe('GET /api/blogs/:id', () => {
    it('should query details with joining comments', async () => {
      const res = await request(app).get('/api/blogs/1');

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('ESA YGT Selection');
      expect(res.body.comments).toHaveLength(1);
      expect(res.body.comments[0].content).toBe('Congrats!');
    });

    it('should throw 404 if post id does not exist', async () => {
      // Mock specific query to return empty for post detail
      db.query.mockImplementationOnce((sql) => {
        if (sql.toLowerCase().includes('select bp.*')) {
          return Promise.resolve({ rows: [] });
        }
        return Promise.resolve({ rows: [] });
      });

      const res = await request(app).get('/api/blogs/999');

      expect(res.status).toBe(404);
      expect(res.body.error).toContain('does not exist');
    });
  });

  describe('POST /api/blogs/:id/comments', () => {
    it('should block unauthenticated submissions', async () => {
      const res = await request(app)
        .post('/api/blogs/1/comments')
        .send({ content: 'Nice job!' });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('No session coordinates found');
    });

    it('should allow comments when authorized', async () => {
      const res = await request(app)
        .post('/api/blogs/1/comments')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({ content: 'Space rocks!' });

      expect(res.status).toBe(201);
      expect(res.body.content).toBe('Space rocks!');
      expect(res.body.author_name).toBe('Cadet Chen');
    });
  });
});
