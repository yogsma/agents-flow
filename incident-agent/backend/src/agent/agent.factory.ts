import { ChatOpenAI } from '@langchain/openai';
import * as dotenv from 'dotenv';
import { ModelProvider } from './enum/model-provider.enum';
import { ReactAgentBuilder } from './agent.builder';
import { CompiledStateGraph, MessagesAnnotation } from '@langchain/langgraph';
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';


dotenv.config();

export class AgentFactory {
  public static createAgent(
    modelProvider: ModelProvider,
    tools: any[],
    checkpointer?: PostgresSaver
  ): CompiledStateGraph<typeof MessagesAnnotation, any> {
    if (!modelProvider) {
      throw new Error('Model provider is required');
    }

    switch (modelProvider) {
      // OpenAI
      case ModelProvider.OPENAI: {
        return new ReactAgentBuilder(
          tools,
          new ChatOpenAI({
            model: process.env.OPENAI_MODEL,
            // Add any additional OpenAI configuration here
          })
        ).build(checkpointer);
      }
      case ModelProvider.GOOGLE: {
        return new ReactAgentBuilder(
          tools,
          new ChatGoogleGenerativeAI({
            model: process.env.GOOGLE_GENAI_MODEL || '',
            // Add any additional Google Gen AI configuration here
          }),
        ).build(checkpointer);
      }

    }

  }
}