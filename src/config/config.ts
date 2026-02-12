import dotenv from 'dotenv';

dotenv.config();

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
  },
  database: {
    url: process.env.DATABASE_URL || '',
    connectionTimeout: 5000,
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  features: {
    streaming: true,
    memory: true,
    functionCalling: true,
  },
};

// Validate required environment variables
export function validateConfig(): void {
  if (!config.openai.apiKey) {
    throw new Error('OPENAI_API_KEY is not set in .env file');
  }

  if (config.server.env === 'production' && !config.database.url) {
    console.warn('DATABASE_URL is not set. Database features will be disabled.');
  }
}