const express = require('express');
const db = require('../db');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /blogs
// @desc    Retrieve all blogs (paginated, filtered, searched)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 6;
  const category = req.query.category || 'ALL';
  const search = req.query.search || '';
  
  const offset = (page - 1) * limit;

  try {
    const searchQuery = `%${search}%`;

    // 1. Build Query for counts
    let countQueryText = `
      SELECT COUNT(bp.id) as total 
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE 1=1
    `;
    const countParams = [];

    if (category !== 'ALL') {
      countParams.push(category);
      countQueryText += ` AND bp.category = $${countParams.length}`;
    }

    if (search) {
      countParams.push(searchQuery);
      countQueryText += ` AND (bp.title ILIKE $${countParams.length} OR bp.content ILIKE $${countParams.length} OR bp.excerpt ILIKE $${countParams.length})`;
    }

    const countResult = await db.query(countQueryText, countParams);
    const total = parseInt(countResult.rows[0].total, 10);
    const pages = Math.ceil(total / limit);

    // 2. Build Query for records
    let recordsQueryText = `
      SELECT bp.id, bp.title, bp.slug, bp.excerpt, bp.content, bp.category, bp.featured, bp.published_at, bp.view_count, bp.image,
             u.id as author_id, u.name as author_name, u.role as author_role
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE 1=1
    `;
    const recordsParams = [];

    if (category !== 'ALL') {
      recordsParams.push(category);
      recordsQueryText += ` AND bp.category = $${recordsParams.length}`;
    }

    if (search) {
      recordsParams.push(searchQuery);
      recordsQueryText += ` AND (bp.title ILIKE $${recordsParams.length} OR bp.content ILIKE $${recordsParams.length} OR bp.excerpt ILIKE $${recordsParams.length})`;
    }

    // Append ordering, limit, offset
    recordsParams.push(limit);
    recordsQueryText += ` ORDER BY bp.featured DESC, bp.published_at DESC LIMIT $${recordsParams.length}`;
    
    recordsParams.push(offset);
    recordsQueryText += ` OFFSET $${recordsParams.length}`;

    const recordsResult = await db.query(recordsQueryText, recordsParams);

    return res.json({
      data: recordsResult.rows,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    });
  } catch (err) {
    console.error('Fetch blogs error:', err);
    return res.status(500).json({ error: 'INTERNAL_ERROR: Unable to scan database nodes.' });
  }
});

// @route   GET /blogs/:id
// @desc    Retrieve details of a single post with comments
router.get('/:id', async (req, res) => {
  const blogId = parseInt(req.params.id, 10);

  if (isNaN(blogId)) {
    return res.status(400).json({ error: 'VALIDATION_ERROR: Invalid blog post identifier.' });
  }

  try {
    // 1. Fetch Post Detail
    const postResult = await db.query(`
      SELECT bp.*, u.name as author_name, u.role as author_role
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.id = $1
    `, [blogId]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'NOT_FOUND: Blog post coordinate does not exist.' });
    }

    const post = postResult.rows[0];

    // Increment view count asynchronously
    db.query('UPDATE blog_posts SET view_count = view_count + 1 WHERE id = $1', [blogId]).catch(e => {});

    // 2. Fetch Comments
    const commentsResult = await db.query(`
      SELECT c.id, c.content, c.created_at,
             u.id as author_id, u.name as author_name, u.role as author_role
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC
    `, [blogId]);

    post.comments = commentsResult.rows;

    return res.json(post);
  } catch (err) {
    console.error('Fetch blog detail error:', err);
    return res.status(500).json({ error: 'INTERNAL_ERROR: Failed to query blog nodes.' });
  }
});

// @route   POST /blogs/:id/comments
// @desc    Add comment to a blog post (auth required)
router.post('/:id/comments', protect, async (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  const { content } = req.body;

  if (isNaN(blogId)) {
    return res.status(400).json({ error: 'VALIDATION_ERROR: Invalid blog post identifier.' });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'VALIDATION_ERROR: Comment content cannot be empty.' });
  }

  try {
    // 1. Verify post exists
    const checkPost = await db.query('SELECT id FROM blog_posts WHERE id = $1', [blogId]);
    if (checkPost.rows.length === 0) {
      return res.status(404).json({ error: 'NOT_FOUND: Target blog post coordinate does not exist.' });
    }

    // 2. Insert comment
    const insertResult = await db.query(`
      INSERT INTO comments (post_id, author_id, content)
      VALUES ($1, $2, $3)
      RETURNING id, content, created_at
    `, [blogId, req.user.userId, content.trim()]);

    const newComment = insertResult.rows[0];
    
    // Add user details for direct frontend display
    newComment.author_id = req.user.userId;
    newComment.author_name = req.user.name;
    newComment.author_role = req.user.role;

    return res.status(201).json(newComment);
  } catch (err) {
    console.error('Insert comment error:', err);
    return res.status(500).json({ error: 'INTERNAL_ERROR: Failed to register comment.' });
  }
});

module.exports = router;
