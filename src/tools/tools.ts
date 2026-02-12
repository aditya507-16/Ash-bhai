import { Tool } from '@langchain/core/tools';
import { DynamicTool } from '@langchain/core/tools';
import { db } from '../database/db';
import axios from 'axios';

export function initializeTools(): Tool[] {
  return [
    // Tool 1: Get User Profile
    new DynamicTool({
      name: 'get_user_profile',
      description:
        'Fetch user profile information from database by user ID. Use this to get user preferences, email, and other details.',
      func: async (userId: string) => {
        try {
          const user = await db.getUser(userId);
          if (!user) {
            return JSON.stringify({ error: 'User not found' });
          }
          return JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            preferences: user.preferences,
          });
        } catch (error) {
          return JSON.stringify({ error: 'Failed to fetch user profile' });
        }
      },
    }),

    // Tool 2: Save Conversation to Database
    new DynamicTool({
      name: 'save_conversation',
      description:
        'Save the current conversation to database. Pass conversation ID, user ID, and message data.',
      func: async (data: string) => {
        try {
          const parsedData = JSON.parse(data);
          const message = await db.saveMessage(
            parsedData.conversationId,
            parsedData.role,
            parsedData.content
          );
          return JSON.stringify({
            success: true,
            messageId: message.id,
          });
        } catch (error) {
          return JSON.stringify({ error: 'Failed to save conversation' });
        }
      },
    }),

    // Tool 3: Get Conversation History
    new DynamicTool({
      name: 'get_conversation_history',
      description:
        'Retrieve entire conversation history from database by conversation ID.',
      func: async (conversationId: string) => {
        try {
          const history = await db.getConversationHistory(conversationId);
          return JSON.stringify({
            messages: history,
            count: history.length,
          });
        } catch (error) {
          return JSON.stringify({ error: 'Failed to fetch conversation history' });
        }
      },
    }),

    // Tool 4: Get Weather
    new DynamicTool({
      name: 'get_weather',
      description:
        'Get current weather information for a specific location. Pass location name as parameter.',
      func: async (location: string) => {
        try {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=40&longitude=-74&current=temperature_2m,weather_code`
          );
          return JSON.stringify({
            location,
            weather: response.data.current,
            source: 'Open-Meteo API',
          });
        } catch (error) {
          return JSON.stringify({ error: 'Failed to fetch weather data' });
        }
      },
    }),

    // Tool 5: Search Knowledge Base
    new DynamicTool({
      name: 'search_knowledge_base',
      description:
        'Search company knowledge base or documentation for information about specific topics.',
      func: async (query: string) => {
        try {
          // This is a placeholder - integrate with your actual knowledge base
          const results = {
            query,
            results: [
              {
                title: 'Sample Documentation',
                content: 'This is sample documentation content',
                source: 'knowledge_base',
              },
            ],
          };
          return JSON.stringify(results);
        } catch (error) {
          return JSON.stringify({ error: 'Knowledge base search failed' });
        }
      },
    }),

    // Tool 6: Calculate or Perform Math Operations
    new DynamicTool({
      name: 'calculate',
      description:
        'Perform mathematical calculations. Pass a simple math expression like "2+2" or "10*5".',
      func: async (expression: string) => {
        try {
          // Safe eval alternative - only for simple math
          const result = Function('"use strict"; return (' + expression + ')')();
          return JSON.stringify({ expression, result });
        } catch (error) {
          return JSON.stringify({ error: 'Invalid mathematical expression' });
        }
      },
    }),

    // Tool 7: Get Current Time/Date
    new DynamicTool({
      name: 'get_current_time',
      description:
        'Get current date and time in ISO format. Useful for scheduling or timestamp-related queries.',
      func: async () => {
        const now = new Date();
        return JSON.stringify({
          timestamp: now.toISOString(),
          readable: now.toString(),
          unix: now.getTime(),
        });
      },
    }),

    // Tool 8: Store User Preference
    new DynamicTool({
      name: 'store_preference',
      description:
        'Store user preferences for future interactions. Pass user ID and preference data.',
      func: async (data: string) => {
        try {
          const parsedData = JSON.parse(data);
          // Implement your preference storage logic here
          return JSON.stringify({
            success: true,
            message: 'Preference stored successfully',
          });
        } catch (error) {
          return JSON.stringify({ error: 'Failed to store preference' });
        }
      },
    }),
  ];
}