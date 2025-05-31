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

// Workflow-related operations

// Query to fetch all available node types
export const GET_NODE_TYPES = gql`
  query GetNodeTypes {
    nodeTypes {
      id
      name
      description
      category
      color
      logoUrl
      inputs {
        id
        label
      }
      outputs {
        id
        label
      }
      configSchema
    }
  }
`;

// Query to fetch all workflows
export const GET_WORKFLOWS = gql`
  query GetWorkflows {
    workflows {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

// Query to fetch a specific workflow
export const GET_WORKFLOW = gql`
  query GetWorkflow($id: ID!) {
    workflow(id: $id) {
      id
      name
      description
      nodes
      edges
      createdAt
      updatedAt
    }
  }
`;

// Mutation to save a workflow
export const SAVE_WORKFLOW = gql`
  mutation SaveWorkflow($input: WorkflowInput!) {
    saveWorkflow(input: $input) {
      id
      name
      description
      nodes
      edges
      createdAt
      updatedAt
    }
  }
`;

// Mutation to delete a workflow
export const DELETE_WORKFLOW = gql`
  mutation DeleteWorkflow($id: ID!) {
    deleteWorkflow(id: $id)
  }
`;

// Mutation to execute a workflow
export const EXECUTE_WORKFLOW = gql`
  mutation ExecuteWorkflow($id: ID!, $input: JSON!) {
    executeWorkflow(id: $id, input: $input) {
      executionId
      workflowId
      status
      startedAt
    }
  }
`;

// Query to check workflow execution status
export const GET_WORKFLOW_EXECUTION = gql`
  query GetWorkflowExecution($executionId: ID!) {
    workflowExecution(executionId: $executionId) {
      executionId
      workflowId
      status
      startedAt
      completedAt
      result
    }
  }
`;
