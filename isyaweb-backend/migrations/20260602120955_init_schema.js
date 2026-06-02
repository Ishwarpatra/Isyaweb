/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email', 255).unique().notNullable();
      table.string('password_hash', 255).notNullable();
      table.string('name', 255).notNullable();
      table.string('role', 50).defaultTo('user');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.index('email', 'idx_users_email');
    })
    .createTable('blog_posts', function(table) {
      table.increments('id').primary();
      table.string('title', 500).notNullable();
      table.string('slug', 500).unique();
      table.text('content').notNullable();
      table.string('excerpt', 500);
      table.integer('author_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('category', 100).defaultTo('MISSION_UPDATE');
      table.boolean('featured').defaultTo(false);
      table.integer('view_count').defaultTo(0);
      table.string('image', 500);
      table.timestamp('published_at').defaultTo(knex.fn.now());
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.index('author_id', 'idx_blog_posts_author');
    })
    .createTable('comments', function(table) {
      table.increments('id').primary();
      table.integer('post_id').unsigned().references('id').inTable('blog_posts').onDelete('CASCADE');
      table.integer('author_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.text('content').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.index('post_id', 'idx_comments_post');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('blog_posts')
    .dropTableIfExists('users');
};
