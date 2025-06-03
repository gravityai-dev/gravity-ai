/**
 * GraphQL subscriptions for Gravity AI
 */

import { gql } from '@apollo/client';

export const AI_RESULT_SUBSCRIPTION = gql`
  subscription AiResult($conversationId: ID!) {
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
      ... on AudioChunk {
        chatId
        conversationId
        userId
        providerId
        timestamp
        state
        audioData
        format
        duration
        textReference
        sourceType
      }
    }
  }
`;
