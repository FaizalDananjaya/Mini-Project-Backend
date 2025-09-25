# Candidate Evaluation Backend Service

A backend service that evaluates candidate CVs and project reports against job vacancies using AI workflows.

## Features

- Upload CV and project report (text, PDF, docx)
- Asynchronous evaluation with AI-driven pipeline
- LLM chaining for CV extraction, comparison, and project scoring
- Mock vector DB for context retrieval
- Error handling and retries

## Tech Stack

- Node.js, Express
- OpenAI API (with mock fallback)
- File parsing: pdf-parse, mammoth

## Installation

1. Clone the repo
2. `npm install`
3. Set OPENAI_API_KEY if using real API
4. `npm start`

## API Endpoints

- POST /upload: Upload CV and project report, returns upload ID
- POST /evaluate: Start evaluation, body {uploadId}, returns task ID
- GET /result/{id}: Get evaluation result

## Design Choices

- Async processing to handle long-running AI calls
- Mock LLM responses for demo
- Simple in-memory storage for uploads/tasks
- Vector DB mocked with predefined contexts

## Run Instructions

`npm start` to run on port 3000.
