const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
  let token = req.cookies ? req.cookies.token : null;

  // Fallback to Bearer token in headers for versatility
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'UNAUTHORIZED: No session coordinates found.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'isya_jwt_telemetry_secure_secret_hash_2026_xyz');
    
    // Check if token age exceeds 1 hour (3600 seconds)
    const SESSION_MAX_AGE_SEC = 3600;
    const nowSec = Math.floor(Date.now() / 1000);
    if (decoded.iat && (nowSec - decoded.iat) > SESSION_MAX_AGE_SEC) {
      return res.status(401).json({ error: 'UNAUTHORIZED: Session expired' });
    }

    req.user = decoded; // { userId, email, name, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'UNAUTHORIZED: Session token verification failed.' });
  }
};

module.exports = { protect };
