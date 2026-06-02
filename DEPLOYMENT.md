# Deployment Guide

This guide covers deployment procedures for the ISYA Space Portal frontend and backend.

## 📡 Backend Deployment (Express.js + PostgreSQL)

The backend runs on Node.js/Express.js and requires a PostgreSQL database instance.

### 1. Deploying to Heroku or Railway
You can deploy the backend code to platforms like Railway, Heroku, or Render.

#### For Heroku:
```bash
# Login to Heroku CLI
heroku login

# Create a Heroku application
heroku create isyaweb-backend

# Provision a PostgreSQL Database addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_SECRET=your_jwt_secret_here
heroku config:set CORS_ORIGIN=https://isyaweb-frontend.vercel.app

# Push the backend directory to heroku
git subtree push --prefix isyaweb-backend heroku main
```

#### For Railway:
1. Connect your Github Repository to Railway.
2. Select the `isyaweb-backend` subdirectory as the root directory of the project.
3. Provision a PostgreSQL Database service in the same project.
4. Railway will automatically inject `DATABASE_URL` into your backend service environment.
5. Manually configure the remaining environment variables:
   - `PORT`
   - `JWT_SECRET`
   - `CORS_ORIGIN` (set to your Vercel/frontend production URL)
   - `NODE_ENV` (`production`)

### 2. Database Migrations Setup
Before running the server, execute migrations using Knex:
```bash
npx knex migrate:latest
```

---

## 🎨 Frontend Deployment (Vite + React)

The frontend is a static React application built using Vite.

### 1. Deploying to Vercel or Netlify

#### For Vercel:
1. Connect your Github Repository to Vercel.
2. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (Root directory of workspace)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Configure the environment variables:
   - `VITE_API_BASE_URL`: `https://isyaweb-backend.herokuapp.com/api` (or your custom backend domain API prefix)
   - `VITE_ENVIRONMENT`: `production`

---

## 🔒 Security Best Practices & Maintenance

### 1. Session Idle Timeout
Ensure the production backend sets cookie security attributes:
```javascript
// Secure httpOnly session cookie
res.cookie('token', token, {
  httpOnly: true,
  secure: true, // Requires HTTPS
  sameSite: 'Strict',
  maxAge: 3600000 // 1 hour session duration
});
```

### 2. Regular Backups
To take a daily dump of your production database on Railway/Heroku:
```bash
pg_dump -h your_db_host -U your_db_user -d your_db_name > backup-$(date +%Y%m%d).sql
```
