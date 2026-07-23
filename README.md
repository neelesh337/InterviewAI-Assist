# InterviewAI

InterviewAI is a full-stack interview preparation assistant that uses AI to generate tailored interview reports, technical and behavioral questions, skill gap analysis, and resume PDFs based on a candidate's resume, self description, and job description.

## 🚀 What it does

- Lets users register and log in with secure JWT cookie-based authentication
- Accepts a resume PDF upload and a job description
- Sends candidate and job details to Google Gemini AI
- Returns a structured interview report with:
  - match score
  - technical interview questions and answers
  - behavioral interview questions and answers
  - skill gap analysis
  - day-by-day preparation plan
- Stores reports in MongoDB for later retrieval
- Generates a downloadable resume PDF using AI-generated HTML and Puppeteer

## 🧱 Tech stack

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication with `jsonwebtoken`
- Password hashing with `bcrypt`
- File upload with `multer`
- PDF parsing with `pdf-parse`
- Google Gemini AI via `@google/genai`
- Resume PDF generation with `puppeteer`
- Validation support with `zod`
- Environment config with `dotenv`

### Frontend
- React 19
- Vite
- React Router 8
- Axios for HTTP calls
- SCSS for styling

## 📁 Project structure

- `Backend/`
  - `server.js` — server entrypoint
  - `src/app.js` — Express app setup and route registration
  - `src/config/database.js` — MongoDB connection
  - `src/routes/` — auth and interview API routes
  - `src/controllers/` — request handlers for auth and interview operations
  - `src/services/ai.service.js` — Gemini AI prompt logic and PDF creation
  - `src/models/` — MongoDB models for users, interview reports, and token blacklist
  - `src/middlewares/` — authentication and file upload middleware

- `Frontend/`
  - `src/App.jsx` — top-level context providers and routing
  - `src/app.routes.jsx` — route definitions
  - `src/features/auth/` — login/register pages and auth API services
  - `src/features/interview/` — report generation, viewing pages, and interview service

## ⚙️ Setup instructions

### 1. Clone repository

```bash
git clone <repo-url>
cd InterviewAI
```

### 2. Configure environment variables

Create a `.env` file inside `Backend/` with the following values:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

> Keep this file private and do not commit it to source control.

### 3. Install backend dependencies

```bash
cd Backend
npm install
```

### 4. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 5. Run backend server

```bash
cd ../Backend
npm run dev
```

The backend will start on `http://localhost:3000`.

### 6. Run frontend app

```bash
cd ../Frontend
npm run dev
```

The frontend will start on `http://localhost:5173`.

## 🧠 How it works

1. User registers or logs in through the frontend.
2. The backend issues a JWT stored in a secure cookie.
3. Authenticated users submit a resume PDF and job description from the homepage.
4. The backend parses the resume text using `pdf-parse`.
5. The parsed resume text and job details are sent to Google Gemini AI using `@google/genai`.
6. AI returns a structured interview report that is saved in MongoDB.
7. The user can view the report and download a tailored resume PDF.

## 🔌 API endpoints

### Auth
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — log in
- `GET /api/auth/logout` — log out and blacklist the token
- `GET /api/auth/get-me` — get currently authenticated user details

### Interview
- `POST /api/interview/` — generate interview report (requires auth)
- `GET /api/interview/report/:interviewId` — get a saved report by ID (requires auth)
- `GET /api/interview/` — list all reports for current user (requires auth)
- `POST /api/interview/resume/pdf/:interviewReportId` — generate/download resume PDF (requires auth)

## 🧪 Notes

- The backend expects the frontend origin `http://localhost:5173` for CORS.
- The interview report generation route accepts a PDF file upload and returns the AI-generated report.
- The resume PDF route converts AI-generated HTML into a downloadable PDF with Puppeteer.

## 💡 Tips for use

- Use a real job description and resume for the best results.
- If you do not have a PDF resume, provide a strong self-description.
- Keep credentials and API keys out of version control.

## 🛠️ Recommended improvements

- Add form validation for frontend inputs.
- Add more error handling for API failures.
- Store UI state for selected reports in local storage or Redux.
- Add tests for backend controllers and frontend services.

## 📚 License

This project does not specify a license.
