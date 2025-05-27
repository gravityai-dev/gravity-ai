import { gql } from '@apollo/client';

// Talk to agent mutation
export const TALK_TO_AGENT = gql`
  mutation TalkToAgent($input: AgentInput!) {
    talkToAgent(input: $input) {
      chatId
      conversationId
      userId
      executionId
      providerId
      success
      message
    }
  }
`;

// Agent stream subscription
export const AGENT_STREAM = gql`
  subscription AgentStream($conversationId: ID!) {
    aiResult(conversationId: $conversationId) {
      __typename
      ... on MessageChunk {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        text
        mdxContent
      }
      ... on Text {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        text
        mdxContent
      }
      ... on ProgressUpdate {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        message
        mdxContent
      }
      ... on JsonData {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        data
        mdxContent
      }
      ... on ActionSuggestion {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        type
        payload
        mdxContent
      }
      ... on Metadata {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        message
        mdxContent
      }
      ... on ImageResponse {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        url
        alt
        mdxContent
      }
      ... on ToolOutput {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        tool
        result
        mdxContent
      }
    }
  }
`;

// Chat status query
export const GET_CHAT_STATUS = gql`
  query GetChatStatus($chatId: ID!) {
    getChatStatus(chatId: $chatId) {
      exists
      status
      startTime
      message
      error
    }
  }
`;
