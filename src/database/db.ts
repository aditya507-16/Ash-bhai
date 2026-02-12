import { Pool, QueryResult } from 'pg';
import { config } from '../config/config';

const pool = new Pool({
  connectionString: config.database.url,
  connectionTimeoutMillis: config.database.connectionTimeout,
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

export const db = {
  /**
   * Get user profile by ID
   */
  async getUser(userId: string): Promise<any> {
    try {
      const result: QueryResult = await pool.query(
        'SELECT * FROM user_profiles WHERE id = $1',
        [userId]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  /**
   * Create a new user
   */
  async createUser(userId: string, name: string, email: string): Promise<any> {
    try {
      const result: QueryResult = await pool.query(
        'INSERT INTO user_profiles (id, name, email) VALUES ($1, $2, $3) RETURNING *',
        [userId, name, email]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Save a message to conversation history
   */
  async saveMessage(
    conversationId: string,
    role: 'user' | 'assistant',
    content: string
  ): Promise<any> {
    try {
      const result: QueryResult = await pool.query(
        'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING *',
        [conversationId, role, content]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  },

  /**
   * Create a new conversation
   */
  async createConversation(userId: string): Promise<any> {
    try {
      const result: QueryResult = await pool.query(
        'INSERT INTO conversations (user_id) VALUES ($1) RETURNING *',
        [userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  /**
   * Get conversation history
   */
  async getConversationHistory(conversationId: string): Promise<any[]> {
    try {
      const result: QueryResult = await pool.query(
        'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY timestamp ASC',
        [conversationId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  },

  /**
   * Get all conversations for a user
   */
  async getUserConversations(userId: string): Promise<any[]> {
    try {
      const result: QueryResult = await pool.query(
        'SELECT * FROM conversations WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching user conversations:', error);
      throw error;
    }
  },

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    try {
      await pool.end();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  },
};