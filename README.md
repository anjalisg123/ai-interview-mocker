# AI Interview Mocker
## 📺 Demo - https://ai-interview-mocker-one-tau.vercel.app/sign-in?redirect_url=https%3A%2F%2Fai-interview-mocker-one-tau.vercel.app%2F

# Overview
AI Interview Mocker is a full-stack web application that serves as your personal AI-powered interview coach. It allows users to practice for real-world job interviews by generating customized questions based on their specific job role, tech stack, and experience level.

This project was built to demonstrate mastery of full-stack development using Next.js (App Router), incorporating Generative AI (Google Gemini), Speech-to-Text, PostgreSQL, and Authentication.

# 🛠 Tech Stack
## Backend & Database

Framework: Next.js 14 (Server Actions & API Routes)

Database: PostgreSQL (via NeonDB)

ORM: Drizzle ORM

Authentication: Clerk (Social & Email Auth)

AI Engine: Google Gemini API

## Frontend

Framework: React

Build Tool: Next.js

Styling: Tailwind CSS + ShadCN UI

Icons: Lucide React

Media: react-webcam & react-hook-speech-to-text

# 📋 Prerequisites
Before running this application, ensure you have the following installed:

Node.js (v18 or higher)

VS Code or any preferred editor

Git

# 🚀 Setup & Installation Instructions
Follow these steps to run the application locally.

## 1. Clone the Repository

Bash
git clone https://github.com/anjalisg123/ai-interview-mocker.git
cd ai-interview-mocker

## 2. Install Dependencies
Install the required packages using npm, yarn, or pnpm:

Bash
npm install

## 3. Configuration & Environment Variables
Create a file named .env.local in the root directory and add the following keys.

File: .env.local

Code snippet
### Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

### Clerk Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/

### Database (NeonDB / PostgreSQL)
NEXT_PUBLIC_DRIZZLE_DB_URL=postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require

### Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

### App Config
NEXT_PUBLIC_INTERVIEW_QUESTIONS=5
NEXT_PUBLIC_INFORMATION="Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview."
NEXT_PUBLIC_QUESTION_NOTE="Click on record answer when you want to answer the question."

## 4. Database Setup
This project uses Drizzle ORM. You need to push the schema to your PostgreSQL database.

Bash
npm run db:push
(This command connects to your NeonDB and creates the necessary tables automatically).

## 5. Run the Application
Start the development server:

Bash
npm run dev
The application will be accessible at:

http://localhost:3000
# ✨ Features & Requirements Met
## 1. Authentication System

Secure Google & GitHub login via Clerk

Protected routes via Middleware

Role-based redirects (Guest -> Sign In -> Home)

## 2. AI Interview Engine

Generates 5 unique questions based on:

Job Role

Tech Stack

Years of Experience

Powered by Google Gemini Generative AI

## 3. Interactive Interview Experience

Webcam & Mic: Real-time audio/video permissions.

Text-to-Speech: The AI "speaks" the question to the user.

Speech-to-Text: Records user answers via microphone and converts to text.

Timer/Recording Control: Start and stop recording functionality.

## 4. Instant AI Feedback

Analyzes the recorded answer against the question.

Provides a numeric rating (1-5).

Generates detailed textual feedback (Strengths & Areas for Improvement).

Suggests the "Correct Answer" for comparison.

## 5. Dashboard & History

View list of past mock interviews.

Expandable feedback accordion for every question answered.

Performance tracking.

# 📝 Troubleshooting
Webcam/Microphone not working?

Ensure you have granted browser permissions for Camera and Microphone.

Verify your browser is not blocking pop-ups or media devices.

Database connection error?

Check if NEXT_PUBLIC_DRIZZLE_DB_URL is correct in .env.local.

Ensure your IP is whitelisted if using a cloud database with restrictions.

AI Rating showing NaN?

This usually happens if the AI output format changes. The application includes fallback parsing logic (using parseFloat) to handle different response formats.
