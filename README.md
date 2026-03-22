# DevLens API

[![Node.js Version](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black.svg)](https://expressjs.com/)
[![Made For](https://img.shields.io/badge/Made%20For-Dev%20Lens-orange.svg)](https://github.com/muhammadSaadXCII/Dev_Lens_App)

A secure Node.js/Express backend that acts as a middleware layer between the [Dev Lens Flutter App](https://github.com/muhammadSaadXCII/Dev_Lens_App) and the GitHub AI model — keeping API keys safe on the server and out of the client.

---

## 🚀 Project Overview

The Code Reviewer API is the backend powering **Dev Lens**. Instead of calling the AI model directly from the Flutter app (which would expose the token in the client), all requests are routed through this Express server. It uses the **GitHub AI Inference** endpoint with **GPT-4o Mini** to automatically detect the language, identify bugs, and return a better version of the submitted code — all formatted in clean Markdown.

### ✨ Key Features

- **Secure Token Handling:** `GITHUB_TOKEN` lives on the server — never exposed to the client.
- **AI-Powered Code Review:** Uses `gpt-4o-mini` via GitHub's AI Inference endpoint.
- **Auto Language Detection:** The AI detects the programming language automatically.
- **Markdown Response:** Feedback is returned in clean, structured Markdown.
- **CORS Enabled:** Configured to accept requests from the Flutter app.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A GitHub Personal Access Token with access to [GitHub Models](https://github.com/marketplace/models)

---

## 📦 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muhammadSaadXCII/Code_Reviewer_API.git
   cd Code_Reviewer_API
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project:

   ```env
   PORT=8000
   GITHUB_TOKEN=your_github_token_here
   ```

---

## 🏃 Running the Server

```bash
node server.js
```

The server will start at `http://localhost:8000`.

---

## 📡 API Reference

### `POST /api/review`

Submits code for AI-powered review.

**Request Body:**

```json
{
  "code": "def add(a, b):\n  return a + b"
}
```

**Success Response — `201 Created`:**

```json
{
  "review": "## Code Review\n\n**Language Detected:** Python\n\n..."
}
```

**Error Response — `500 Internal Server Error`:**

```json
{
  "message": "Internal Server Error",
  "error": "error details here"
}
```

---

## 📂 Project Structure

```
Code_Reviewer_API/
├── server.js          # Main Express server & API logic
├── package.json       # Project metadata & dependencies
├── package-lock.json  # Dependency lock file
├── .gitignore         # Ignores node_modules, .env, etc.
└── .env               # Environment variables (not committed)
```
