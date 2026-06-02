-- schema.sql
-- Drop tables if they exist
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'mentor', 'moderator', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  author_id INT REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100) DEFAULT 'MISSION_UPDATE' CHECK (category IN ('MISSION_UPDATE', 'RESEARCH', 'EVENT', 'EDUCATION', 'COMMUNITY')),
  featured BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  image VARCHAR(500),
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments Table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_id INT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Optimization Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_comments_post ON comments(post_id);
