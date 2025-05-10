// alumbra-backend/config/env.config.js
// Centralized environment variable management (if needed beyond process.env)

// Example: Load .env file if not already loaded by a higher-level mechanism
// require('dotenv').config();

const envConfig = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  webhookUrl: process.env.WEBHOOK_URL,
  port: process.env.PORT || 3001,
  // Add other environment variables as needed
};

module.exports = envConfig;
