const app = require('./app');
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Startup database verification and listen
db.pool.query('SELECT NOW()')
  .then(() => {
    console.log('✓ Telemetry database node connected successfully.');
    app.listen(PORT, () => {
      console.log(`📡 Server broadcasting online at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to establish link to database node:', err);
    process.exit(1);
  });
