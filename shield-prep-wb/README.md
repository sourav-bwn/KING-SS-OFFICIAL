# ShieldPrep WB

An exam-preparation app for WBCHSE students, with a React Native (Expo) mobile client and an Express backend. Teachers publish and approve content; students consume it in a screenshot-protected viewer, chat with an AI study buddy, and track mock-test progress.

> **Status:** prototype. The backend uses an in-memory mock database and the AI study buddy returns canned replies (no external AI API is wired up yet).

## Project structure

- `mobile/` - Expo app (React Native)
- `backend/` - Express API with JWT authentication, plus a teacher dashboard served at `/dashboard`

## Backend

```bash
cd backend
npm install
npm start        # listens on PORT (default 3000)
npm test         # runs the node:test suite in test/server.test.js
```

### API endpoints

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/auth/login` | public | Log in with phone + password + deviceId, returns a JWT |
| POST | `/auth/register` | public | Register a new account |
| GET | `/content` | Student | List published content |
| GET | `/admin/users` | Teacher | List users (passwords stripped) |
| POST | `/admin/approve` | Teacher | Approve or ban a user |
| POST | `/admin/content` | Teacher | Add new content |
| POST | `/ai/chat` | authenticated | AI study buddy (mock reply) |
| GET | `/student/progress` | authenticated | Mock-test scores for progress graphs |
| GET | `/dashboard` | public | Teacher dashboard (static page) |

### Demo accounts (from the mock database in `server.js`)

| Role | Phone | Password |
| --- | --- | --- |
| Teacher | `1234567890` | `password` |
| Student | `9876543210` | `studentpass` |

**Before deploying for real:** replace the hardcoded `SECRET_KEY` in `server.js`, hash passwords, and move the mock database to a real one.

## Mobile app

```bash
cd mobile
npm install
npx expo start
```

The app picks its API URL in `src/config.js`:

- Android emulator: `http://10.0.2.2:3000`
- iOS simulator: `http://localhost:3000`
- Physical device: edit the placeholder IP in `getApiUrl()` to your machine's LAN IP
- Production builds: `https://api.shieldprepwb.com` (placeholder)

### Screens

- **Login** - student/teacher sign-in; registration is handled by the teacher
- **StudentDashboard** - hub for content, study buddy, and progress
- **SecureContent** - content viewer that blocks screenshots via `expo-screen-capture`
- **AIStudyBuddy** - chat UI for the AI study buddy
- **ProgressTracker** - mock-test score graphs
