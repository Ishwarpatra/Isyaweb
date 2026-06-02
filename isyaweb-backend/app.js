const Sentry = require('@sentry/node');

// Initialize Sentry error tracking
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 0.1,
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

const app = express();

// 1. Security HTTP Headers via Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://unpkg.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
}));

// 2. Cross-Origin Resource Sharing (CORS)
const allowedOrigins = process.env.CORS_ORIGIN
  ? [process.env.CORS_ORIGIN]
  : ['http://localhost:5173', 'http://localhost:4173']; // 5173=dev, 4173=preview

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

// 3. Cookie Parsing & JSON Input Parsing
app.use(cookieParser());
app.use(express.json());

// 4. Rate Limiting setup (to prevent DDoS & brute force attacks)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    code: 'RATE_LIMIT',
    error: 'Too many requests downlinking. Please hold transmission for 15 minutes.'
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'test' ? 100 : 5, // Limit each IP to 5 authentication requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    code: 'RATE_LIMIT',
    error: 'Too many authentication attempts. Access locked for 15 minutes.'
  }
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// 5. Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// OpenAPI/Swagger UI static spec endpoints
app.get('/api/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger.json'));
});

app.get('/api-docs', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>ISYA Space Portal API Documentation</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
    </head>
    <body style="margin: 0; background: #0b0f19;">
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            url: '/api/swagger.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis
            ]
          });
        };
      </script>
    </body>
    </html>
  `);
});

// Telemetry Health Route
app.get('/api/health', (req, res) => {
  return res.json({
    status: 'ONLINE',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    code: 'NOT_FOUND',
    error: 'Target endpoint coordinate does not exist.'
  });
});

// Sentry Express error handler setup
Sentry.setupExpressErrorHandler(app);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error details:', err.message);
  
  const status = err.status || 500;
  const message = err.message || 'Something went wrong. Critical Core Fault.';
  
  return res.status(status).json({
    status,
    code: err.code || 'INTERNAL_ERROR',
    error: message,
    trace_id: Math.random().toString(36).substring(2, 8).toUpperCase()
  });
});

module.exports = app;
