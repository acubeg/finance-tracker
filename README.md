## AI Finance Tracker

An end-to-end, AI-assisted personal finance tracker that helps users log transactions, set budgets, and learn smarter money habits through an AI coach. Built with a React (Vite + TypeScript) frontend and a Java Spring Boot backend. Uses an LLM API to generate insights, explain spending, and provide personalized guidance.

### Key Features
- **Transactions**: Add, list, and filter income/expenses
- **Budgets**: Track monthly category budgets
- **AI Coach**: Ask questions about your spending, get actionable insights and explanations
- **Insights**: Summarize spending patterns and highlight anomalies

### Architecture
- **Frontend**: React + Vite + TypeScript
  - Pages: Dashboard, Transactions, Budgets, AI Coach
  - Charts (Recharts), HTTP (Axios)
- **Backend**: Java 17 + Spring Boot
  - In-memory services for transactions and budgets (no DB required to start)
  - AI endpoints that call an LLM API (OpenAI by default)
  - CORS enabled for local dev

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.9+
- An LLM API key (OpenAI recommended). Set `OPENAI_API_KEY` in your environment.

### Quick Start
1) Backend

```bash
cd backend
export OPENAI_API_KEY=YOUR_KEY   # or set in your shell profile
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`.

2) Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` with a dev proxy to the backend.

### Configuration
- **CORS**: Allowed origin defaults to `http://localhost:5173`
- **OpenAI**:
  - Env var: `OPENAI_API_KEY`
  - Model: `gpt-4o-mini` (change in `AiService` if desired)

### API Overview (selected)
- `GET /api/transactions` – list transactions
- `POST /api/transactions` – create a transaction
- `DELETE /api/transactions/{id}` – delete a transaction
- `GET /api/budgets` – list budgets
- `POST /api/budgets` – create/update a budget
- `POST /api/ai/insights` – generate spending insights from transactions
- `POST /api/ai/explain` – explain a specific transaction
- `POST /api/ai/coach` – general finance Q&A with context

### Real-World Challenge Solved
Most people struggle to interpret their spending data and stick to budgets. This project centralizes data and adds an AI layer to:
- Translate raw transactions into understandable narratives
- Identify overspending trends early
- Provide personalized suggestions to reduce waste
- Educate users with context-specific explanations

### Extending the Project
- Swap the in-memory stores for a database (e.g., Postgres + Spring Data JPA)
- Add authentication and multi-user support
- Export reports (CSV/PDF)
- Add recurring transaction detection and alerts
- Integrate bank APIs (Plaid, SaltEdge) for automatic import

### Development Tips
- Backend OpenAPI docs at `http://localhost:8080/swagger-ui/index.html`
- Keep the AI prompts grounded with concrete transaction context
- Rate-limit AI calls and cache results if needed

### License
MIT


