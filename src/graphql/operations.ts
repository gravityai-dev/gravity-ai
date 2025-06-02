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
        type
        required
        description
      }
      outputs {
        id
        label
        type
      }
      configSchema
      credentials {
        name
        required
        displayName
        description
      }
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

// Query to fetch workflow executions for a specific workflow ID
export const GET_WORKFLOW_EXECUTIONS = gql`
  query GetWorkflowExecutions($workflowId: ID!, $limit: Int) {
    workflowExecutions(workflowId: $workflowId, limit: $limit) {
      executionId
      workflowId
      status
      startedAt
      completedAt
      result
    }
  }
`;

// Query to fetch node traces for a specific execution ID and node ID
export const GET_NODE_TRACES = gql`
  query GetNodeTraces($executionId: ID!, $nodeId: ID) {
    nodeTraces(executionId: $executionId, nodeId: $nodeId) {
      traceId
      executionId
      nodeId
      nodeType
      startTime
      endTime
      duration
      status
      inputs
      outputs
      error
    }
  }
`;

// Mutation to debug a node
export const DEBUG_NODE = gql`
  mutation DebugNode($input: DebugNodeInput!) {
    debugNode(input: $input) {
      success
      output
      error
      duration
    }
  }
`;

// Credential-related operations

// Query to fetch all credential types
export const GET_CREDENTIAL_TYPES = gql`
  query GetCredentialTypes {
    credentialTypes {
      name
      displayName
      description
      properties {
        name
        displayName
        description
        type
        required
        secret
        default
        placeholder
      }
    }
  }
`;

// Query to fetch all credentials
export const GET_CREDENTIALS = gql`
  query GetCredentials {
    credentials {
      id
      name
      type
      createdAt
      updatedAt
    }
  }
`;

// Query to fetch a specific credential
export const GET_CREDENTIAL = gql`
  query GetCredential($id: ID!) {
    credential(id: $id) {
      id
      name
      type
      data
      createdAt
      updatedAt
    }
  }
`;

// Mutation to create a credential
export const CREATE_CREDENTIAL = gql`
  mutation CreateCredential($input: CredentialInput!) {
    createCredential(input: $input) {
      id
      name
      type
      createdAt
      updatedAt
    }
  }
`;

// Mutation to update a credential
export const UPDATE_CREDENTIAL = gql`
  mutation UpdateCredential($id: ID!, $input: CredentialInput!) {
    updateCredential(id: $id, input: $input) {
      id
      name
      type
      createdAt
      updatedAt
    }
  }
`;

// Mutation to delete a credential
export const DELETE_CREDENTIAL = gql`
  mutation DeleteCredential($id: ID!) {
    deleteCredential(id: $id)
  }
`;
