# Agent Squared ⚡

**Agent Squared** is a no-code platform that empowers businesses to build, train, and deploy autonomous AI agents in under 60 seconds.

Whether you need a 24/7 customer support representative, a social media manager that monitors the web, or a viral marketing machine, Agent Squared lets you instantly spin up AI employees tailored specifically to your company's data and voice.

---

## 🚀 Features

*   **No-Code Agent Builder:** Create complex AI agents through a simple, intuitive web interface. No programming knowledge required.
*   **Custom Knowledge Bases:** Upload company documents, markdown files, and structured text to instantly train your agents on your unique business context.
*   **Real-time Bluesky Integration:** Deploy agents that can automatically monitor mentions, reply to threads, and generate/publish marketing posts with images directly to Bluesky.
*   **Multi-Persona Agents:**
    *   💬 **Support QA:** Customer-facing assistants that answer FAQs and provide 24/7 support using Retrieval-Augmented Generation (RAG).
    *   🦋 **Social Monitor:** Agents that scan Bluesky for brand mentions, perform sentiment analysis, and draft context-aware replies for your approval.
    *   📣 **Social Marketing:** Content creation agents that generate engaging social copy and accompanying promotional images (via Google Imagen), publishing them autonomously.
*   **Built-in Chat Workspaces:** Test and interact with your agents in a polished, customer-like chat interface that supports custom image uploads and rich markdown rendering.

## 🎯 Target Audience

Agent Squared is designed for:
1.  **Small to Medium Businesses (SMBs):** Founders and owners who need to scale their customer support or marketing operations without expanding headcount.
2.  **Marketing Teams:** Professionals looking to automate content generation, social listening, and engagement tracking.
3.  **Customer Success Teams:** Teams wanting to deflect common support tickets and provide instant, accurate answers to their users 24/7.
4.  **Non-Technical Entrepreneurs:** Anyone with a business idea who wants to leverage the power of advanced AI (Google Gemini) without having to write API integrations or build software from scratch.

## 🏗️ Technical Architecture

Agent Squared is a modern, modular web application built with a focus on speed and scalability:

*   **Frontend:** [Next.js](https://nextjs.org/) (React), styled with raw CSS for a lean, custom, and blazing-fast user interface. 
*   **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python) providing a robust, async REST API for processing agent logic, managing conversational state, and interfacing with external services.
*   **AI Engine:** Powered by [Google Gemini](https://ai.google.dev/) (`gemini-2.5-flash`) for lightning-fast text generation, sentiment analysis, and embedding creation, alongside **Google Imagen 3** for high-quality marketing asset generation.
*   **Database:** SQLite (via SQLAlchemy) for lightweight, portable storage of agents, knowledge bases, and chat histories. 
*   **Social Integration:** AT Protocol (`atproto`) SDK for real-time, bidirectional integration with the Bluesky network.

## 🛠️ Local Development Setup

To run Agent Squared locally, you will need Node.js and Python 3.10+ installed.

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env # Add your Gemini API and Bluesky keys
python db/init_db.py
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev -- -p 3000
```

Once both servers are running, navigate to `http://localhost:3000` in your browser to start building your first agent!
