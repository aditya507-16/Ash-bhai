# 🤖 Ash-Bhai - Conversational AI Agent

A powerful **TypeScript-based conversational AI chatbot** built with:
- ✅ GPT-4 Integration
- ✅ Real-time Streaming
- ✅ Memory Management
- ✅ Function Calling & Tool Usage
- ✅ Database Integration (PostgreSQL)
- ✅ REST API + WebSocket Support

---

## 📋 Prerequisites

Before you start, make sure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **OpenAI API Key** - [Get here](https://platform.openai.com/api-keys)
- **PostgreSQL** (Optional, for database features) - [Download](https://www.postgresql.org/)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/aditya507-16/Ash-bhai.git
cd Ash-bhai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your-api-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/ash_bhai
PORT=3000
NODE_ENV=development
```

### 4. Build TypeScript
```bash
npm run build
```

### 5. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

---

## 📂 Project Structure

```
Ash-bhai/
├── src/
│   ├── config/          # Configuration files
│   ├── services/        # Core services (Agent, Chat logic)
│   ├── database/        # Database connection & queries
│   ├── tools/           # AI agent tools & functions
│   ├── utils/           # Utility functions
│   ├── server.ts        # Express server setup
│   └── index.ts         # Entry point
├── dist/                # Compiled JavaScript (auto-generated)
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── .env                 # Environment variables (create this)
└── README.md            # This file
```

---

## 🛠️ Features

### 🧠 AI Capabilities
- Conversational memory (remembers context)
- GPT-4 powered responses
- Function calling for external tools
- Real-time token streaming

### 💾 Database Integration
- PostgreSQL support
- Conversation history storage
- User profiles
- Message persistence

### 🔌 API Endpoints
- `POST /api/chat` - Send message and get response
- `GET /health` - Health check

### 📡 WebSocket Events
- `message` - Send chat message with streaming
- `token` - Receive streamed tokens in real-time
- `message_complete` - Full message received

---

## 📖 Usage

### Using REST API
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! What is your name?"}'
```

### Using WebSocket (JavaScript)
```javascript
const socket = io('http://localhost:3000');

socket.emit('message', {
  text: 'Hello AI!',
  conversationId: 'conv-123'
});

socket.on('token', (data) => {
  console.log('Token:', data.token);
});

socket.on('message_complete', (data) => {
  console.log('Full Response:', data.fullResponse);
});
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `WEATHER_API_KEY` | Optional: Weather API key | `your-key` |

---

## 🧑‍💻 Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📦 Dependencies

- **openai** - OpenAI API client
- **@langchain/openai** - LangChain OpenAI integration
- **langchain** - LLM framework
- **express** - Web server
- **socket.io** - WebSocket support
- **pg** - PostgreSQL client
- **dotenv** - Environment variable management

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

## 📝 License

MIT License - see LICENSE file for details

---

## 👨‍💻 Author

**Aditya** - [GitHub](https://github.com/aditya507-16)

---

## 📞 Support

Need help? Create an issue on [GitHub Issues](https://github.com/aditya507-16/Ash-bhai/issues)

---

**Happy Coding! 🚀**