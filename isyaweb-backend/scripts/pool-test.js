/**
 * Pool load test script
 * Run with: node scripts/pool-test.js
 * Verifies pg.Pool handles concurrent queries correctly
 */

require('dotenv').config();
const { pool } = require('../db');

const ITERATIONS = 100;

async function runPoolTest() {
  console.log(`\n🔁 Starting pool load test: ${ITERATIONS} concurrent queries...\n`);
  const start = Date.now();

  try {
    const promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
      promises.push(pool.query('SELECT 1 AS result'));
    }

    const results = await Promise.all(promises);
    const duration = Date.now() - start;
    const allPassed = results.every(r => r.rows[0].result === 1);

    if (allPassed) {
      console.log(`✅ Completed ${ITERATIONS} concurrent queries in ${duration}ms`);
      console.log(`✅ All queries returned expected result: 1`);
      console.log(`✅ Connection pool is healthy\n`);
    } else {
      console.error('❌ Some queries returned unexpected results');
    }
  } catch (err) {
    console.error('❌ Pool test failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runPoolTest();
