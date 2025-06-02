import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type ActionSuggestion = BaseEvent & {
  __typename?: 'ActionSuggestion';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  payload: Scalars['JSON']['output'];
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  timestamp?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type AgentEvent = ActionSuggestion | AudioChunk | ImageResponse | JsonData | MessageChunk | Metadata | ProgressUpdate | Text | ToolOutput;

export type AgentInput = {
  chatId: Scalars['ID']['input'];
  conversationId: Scalars['ID']['input'];
  enableAudio?: InputMaybe<Scalars['Boolean']['input']>;
  message: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type AgentResponse = {
  __typename?: 'AgentResponse';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  executionId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  responseStream: Array<AgentEvent>;
  success: Scalars['Boolean']['output'];
  userId: Scalars['ID']['output'];
};

export type AgentTypeInfo = {
  __typename?: 'AgentTypeInfo';
  examples?: Maybe<Scalars['JSON']['output']>;
  types: Array<Scalars['String']['output']>;
};

export type AudioChunk = BaseEvent & {
  __typename?: 'AudioChunk';
  audioData: Scalars['String']['output'];
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  duration?: Maybe<Scalars['Float']['output']>;
  format: Scalars['String']['output'];
  providerId?: Maybe<Scalars['String']['output']>;
  sourceType: Scalars['String']['output'];
  state?: Maybe<ChatState>;
  textReference?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type BaseEvent = {
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  timestamp?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type CancelResponse = {
  __typename?: 'CancelResponse';
  chatId: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum ChatState {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  Error = 'ERROR',
  Idle = 'IDLE',
  Responding = 'RESPONDING',
  Thinking = 'THINKING',
  Waiting = 'WAITING'
}

export type ChatStatus = {
  __typename?: 'ChatStatus';
  error?: Maybe<Scalars['String']['output']>;
  exists: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type Credential = {
  __typename?: 'Credential';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CredentialInput = {
  data: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CredentialProperty = {
  __typename?: 'CredentialProperty';
  default?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  placeholder?: Maybe<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  secret: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type CredentialType = {
  __typename?: 'CredentialType';
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  properties: Array<CredentialProperty>;
};

export type CredentialWithData = {
  __typename?: 'CredentialWithData';
  createdAt: Scalars['String']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type DebugNodeInput = {
  config: Scalars['JSON']['input'];
  context: Scalars['JSON']['input'];
  nodeType: Scalars['String']['input'];
};

export type DebugNodeResult = {
  __typename?: 'DebugNodeResult';
  duration?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  output?: Maybe<Scalars['JSON']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ImageResponse = BaseEvent & {
  __typename?: 'ImageResponse';
  alt?: Maybe<Scalars['String']['output']>;
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  timestamp?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type JsonData = BaseEvent & {
  __typename?: 'JsonData';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  data: Scalars['JSON']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  timestamp?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type McpTool = {
  __typename?: 'McpTool';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  schema?: Maybe<Scalars['JSON']['output']>;
};

export type McpToolsResponse = {
  __typename?: 'McpToolsResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  tools: Array<McpTool>;
};

export type MessageChunk = BaseEvent & {
  __typename?: 'MessageChunk';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  text: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type Metadata = BaseEvent & {
  __typename?: 'Metadata';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  timestamp?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelAgentChat: CancelResponse;
  createCredential: Credential;
  debugNode: DebugNodeResult;
  deleteCredential: Scalars['Boolean']['output'];
  deleteWorkflow: Scalars['Boolean']['output'];
  executeWorkflow: WorkflowExecution;
  saveWorkflow: Workflow;
  talkToAgent: AgentResponse;
  updateCredential: Credential;
};


export type MutationCancelAgentChatArgs = {
  chatId: Scalars['ID']['input'];
};


export type MutationCreateCredentialArgs = {
  input: CredentialInput;
};


export type MutationDebugNodeArgs = {
  input: DebugNodeInput;
};


export type MutationDeleteCredentialArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkflowArgs = {
  id: Scalars['ID']['input'];
};


export type MutationExecuteWorkflowArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


export type MutationSaveWorkflowArgs = {
  input: WorkflowInput;
};


export type MutationTalkToAgentArgs = {
  input: AgentInput;
};


export type MutationUpdateCredentialArgs = {
  id: Scalars['ID']['input'];
  input: CredentialInput;
};

export type NodeCredential = {
  __typename?: 'NodeCredential';
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
};

export type NodeExecutionEvent = {
  __typename?: 'NodeExecutionEvent';
  duration?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  executionId: Scalars['ID']['output'];
  nodeId: Scalars['ID']['output'];
  nodeType: Scalars['String']['output'];
  outputs?: Maybe<Scalars['JSON']['output']>;
  state: NodeExecutionState;
  timestamp: Scalars['String']['output'];
  workflowId: Scalars['ID']['output'];
};

export enum NodeExecutionState {
  Completed = 'COMPLETED',
  Error = 'ERROR',
  Started = 'STARTED'
}

export type NodePort = {
  __typename?: 'NodePort';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  required?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type NodeTrace = {
  __typename?: 'NodeTrace';
  duration?: Maybe<Scalars['Float']['output']>;
  endTime?: Maybe<Scalars['Float']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  executionId: Scalars['ID']['output'];
  inputs?: Maybe<Scalars['JSON']['output']>;
  nodeId: Scalars['ID']['output'];
  nodeType: Scalars['String']['output'];
  outputs?: Maybe<Scalars['JSON']['output']>;
  startTime: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  traceId: Scalars['ID']['output'];
};

export type NodeType = {
  __typename?: 'NodeType';
  category: Scalars['String']['output'];
  color: Scalars['String']['output'];
  configSchema?: Maybe<Scalars['JSON']['output']>;
  credentials?: Maybe<Array<NodeCredential>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inputs: Array<NodePort>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  outputs: Array<NodePort>;
};

export type ProgressUpdate = BaseEvent & {
  __typename?: 'ProgressUpdate';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  timestamp?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type ProviderStatus = {
  __typename?: 'ProviderStatus';
  available: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  credential?: Maybe<CredentialWithData>;
  credentialTypes: Array<CredentialType>;
  credentials: Array<Credential>;
  getChatStatus: ChatStatus;
  introspectAgentTypes?: Maybe<AgentTypeInfo>;
  mcpStatus: ProviderStatus;
  mcpTools: McpToolsResponse;
  n8nStatus: ProviderStatus;
  nodeTraces: Array<NodeTrace>;
  nodeTypes: Array<NodeType>;
  ping: Scalars['String']['output'];
  workflow?: Maybe<Workflow>;
  workflowExecution?: Maybe<WorkflowExecution>;
  workflowExecutions: Array<WorkflowExecution>;
  workflows: Array<Workflow>;
};


export type QueryCredentialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetChatStatusArgs = {
  chatId: Scalars['ID']['input'];
};


export type QueryNodeTracesArgs = {
  executionId: Scalars['ID']['input'];
  nodeId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWorkflowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkflowExecutionArgs = {
  executionId: Scalars['ID']['input'];
};


export type QueryWorkflowExecutionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  workflowId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  aiResult: AgentEvent;
  systemStatus: SystemStatus;
  workflowExecution: NodeExecutionEvent;
};


export type SubscriptionAiResultArgs = {
  conversationId: Scalars['ID']['input'];
};


export type SubscriptionWorkflowExecutionArgs = {
  executionId: Scalars['ID']['input'];
};

export type SystemStatus = {
  __typename?: 'SystemStatus';
  graphql: ProviderStatus;
  healthy: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  providers?: Maybe<Array<ProviderStatus>>;
  redis: ProviderStatus;
};

export type Text = BaseEvent & {
  __typename?: 'Text';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<ChatState>;
  text: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type ToolOutput = BaseEvent & {
  __typename?: 'ToolOutput';
  chatId: Scalars['ID']['output'];
  conversationId: Scalars['ID']['output'];
  mdxContent?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  result: Scalars['JSON']['output'];
  state?: Maybe<ChatState>;
  timestamp?: Maybe<Scalars['String']['output']>;
  tool: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type Workflow = {
  __typename?: 'Workflow';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  edges: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nodes: Scalars['JSON']['output'];
  updatedAt: Scalars['String']['output'];
};

export type WorkflowExecution = {
  __typename?: 'WorkflowExecution';
  completedAt?: Maybe<Scalars['String']['output']>;
  executionId: Scalars['ID']['output'];
  result?: Maybe<Scalars['JSON']['output']>;
  startedAt: Scalars['String']['output'];
  status: Scalars['String']['output'];
  workflowId: Scalars['ID']['output'];
};

export type WorkflowInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  edges: Scalars['JSON']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  nodes: Scalars['JSON']['input'];
};

export type TalkToAgentMutationVariables = Exact<{
  input: AgentInput;
}>;


export type TalkToAgentMutation = { __typename?: 'Mutation', talkToAgent: { __typename?: 'AgentResponse', chatId: string, conversationId: string, userId: string, executionId?: string | null, providerId?: string | null, success: boolean, message?: string | null } };

export type AgentStreamSubscriptionVariables = Exact<{
  conversationId: Scalars['ID']['input'];
}>;


export type AgentStreamSubscription = { __typename?: 'Subscription', aiResult: { __typename: 'ActionSuggestion', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, type: string, payload: any, mdxContent?: string | null } | { __typename: 'AudioChunk', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, audioData: string, format: string, duration?: number | null, textReference?: string | null, sourceType: string } | { __typename: 'ImageResponse', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, url: string, alt?: string | null, mdxContent?: string | null } | { __typename: 'JsonData', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, data: any, mdxContent?: string | null } | { __typename: 'MessageChunk', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, text: string, mdxContent?: string | null } | { __typename: 'Metadata', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, message: string, mdxContent?: string | null } | { __typename: 'ProgressUpdate', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, message: string, mdxContent?: string | null } | { __typename: 'Text', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, text: string, mdxContent?: string | null } | { __typename: 'ToolOutput', chatId: string, conversationId: string, userId: string, providerId?: string | null, timestamp?: string | null, state?: ChatState | null, tool: string, result: any, mdxContent?: string | null } };

export type GetChatStatusQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type GetChatStatusQuery = { __typename?: 'Query', getChatStatus: { __typename?: 'ChatStatus', exists: boolean, status: string, startTime?: string | null, message?: string | null, error?: string | null } };

export type GetNodeTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNodeTypesQuery = { __typename?: 'Query', nodeTypes: Array<{ __typename?: 'NodeType', id: string, name: string, description?: string | null, category: string, color: string, logoUrl?: string | null, configSchema?: any | null, inputs: Array<{ __typename?: 'NodePort', id: string, label: string, type?: string | null, required?: boolean | null, description?: string | null }>, outputs: Array<{ __typename?: 'NodePort', id: string, label: string, type?: string | null }>, credentials?: Array<{ __typename?: 'NodeCredential', name: string, required: boolean, displayName?: string | null, description?: string | null }> | null }> };

export type GetWorkflowsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkflowsQuery = { __typename?: 'Query', workflows: Array<{ __typename?: 'Workflow', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type GetWorkflowQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetWorkflowQuery = { __typename?: 'Query', workflow?: { __typename?: 'Workflow', id: string, name: string, description?: string | null, nodes: any, edges: any, createdAt: string, updatedAt: string } | null };

export type SaveWorkflowMutationVariables = Exact<{
  input: WorkflowInput;
}>;


export type SaveWorkflowMutation = { __typename?: 'Mutation', saveWorkflow: { __typename?: 'Workflow', id: string, name: string, description?: string | null, nodes: any, edges: any, createdAt: string, updatedAt: string } };

export type DeleteWorkflowMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWorkflowMutation = { __typename?: 'Mutation', deleteWorkflow: boolean };

export type ExecuteWorkflowMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
}>;


export type ExecuteWorkflowMutation = { __typename?: 'Mutation', executeWorkflow: { __typename?: 'WorkflowExecution', executionId: string, workflowId: string, status: string, startedAt: string } };

export type GetWorkflowExecutionQueryVariables = Exact<{
  executionId: Scalars['ID']['input'];
}>;


export type GetWorkflowExecutionQuery = { __typename?: 'Query', workflowExecution?: { __typename?: 'WorkflowExecution', executionId: string, workflowId: string, status: string, startedAt: string, completedAt?: string | null, result?: any | null } | null };

export type GetWorkflowExecutionsQueryVariables = Exact<{
  workflowId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetWorkflowExecutionsQuery = { __typename?: 'Query', workflowExecutions: Array<{ __typename?: 'WorkflowExecution', executionId: string, workflowId: string, status: string, startedAt: string, completedAt?: string | null, result?: any | null }> };

export type GetNodeTracesQueryVariables = Exact<{
  executionId: Scalars['ID']['input'];
  nodeId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetNodeTracesQuery = { __typename?: 'Query', nodeTraces: Array<{ __typename?: 'NodeTrace', traceId: string, executionId: string, nodeId: string, nodeType: string, startTime: number, endTime?: number | null, duration?: number | null, status: string, inputs?: any | null, outputs?: any | null, error?: string | null }> };

export type DebugNodeMutationVariables = Exact<{
  input: DebugNodeInput;
}>;


export type DebugNodeMutation = { __typename?: 'Mutation', debugNode: { __typename?: 'DebugNodeResult', success: boolean, output?: any | null, error?: string | null, duration?: number | null } };

export type GetCredentialTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCredentialTypesQuery = { __typename?: 'Query', credentialTypes: Array<{ __typename?: 'CredentialType', name: string, displayName: string, description: string, properties: Array<{ __typename?: 'CredentialProperty', name: string, displayName: string, description?: string | null, type: string, required: boolean, secret: boolean, default?: string | null, placeholder?: string | null }> }> };

export type GetCredentialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCredentialsQuery = { __typename?: 'Query', credentials: Array<{ __typename?: 'Credential', id: string, name: string, type: string, createdAt: string, updatedAt: string }> };

export type GetCredentialQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCredentialQuery = { __typename?: 'Query', credential?: { __typename?: 'CredentialWithData', id: string, name: string, type: string, data: any, createdAt: string, updatedAt: string } | null };

export type CreateCredentialMutationVariables = Exact<{
  input: CredentialInput;
}>;


export type CreateCredentialMutation = { __typename?: 'Mutation', createCredential: { __typename?: 'Credential', id: string, name: string, type: string, createdAt: string, updatedAt: string } };

export type UpdateCredentialMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CredentialInput;
}>;


export type UpdateCredentialMutation = { __typename?: 'Mutation', updateCredential: { __typename?: 'Credential', id: string, name: string, type: string, createdAt: string, updatedAt: string } };

export type DeleteCredentialMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCredentialMutation = { __typename?: 'Mutation', deleteCredential: boolean };


export const TalkToAgentDocument = gql`
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
export type TalkToAgentMutationFn = Apollo.MutationFunction<TalkToAgentMutation, TalkToAgentMutationVariables>;

/**
 * __useTalkToAgentMutation__
 *
 * To run a mutation, you first call `useTalkToAgentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTalkToAgentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [talkToAgentMutation, { data, loading, error }] = useTalkToAgentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTalkToAgentMutation(baseOptions?: Apollo.MutationHookOptions<TalkToAgentMutation, TalkToAgentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TalkToAgentMutation, TalkToAgentMutationVariables>(TalkToAgentDocument, options);
      }
export type TalkToAgentMutationHookResult = ReturnType<typeof useTalkToAgentMutation>;
export type TalkToAgentMutationResult = Apollo.MutationResult<TalkToAgentMutation>;
export type TalkToAgentMutationOptions = Apollo.BaseMutationOptions<TalkToAgentMutation, TalkToAgentMutationVariables>;
export const AgentStreamDocument = gql`
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

/**
 * __useAgentStreamSubscription__
 *
 * To run a query within a React component, call `useAgentStreamSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAgentStreamSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAgentStreamSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useAgentStreamSubscription(baseOptions: Apollo.SubscriptionHookOptions<AgentStreamSubscription, AgentStreamSubscriptionVariables> & ({ variables: AgentStreamSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AgentStreamSubscription, AgentStreamSubscriptionVariables>(AgentStreamDocument, options);
      }
export type AgentStreamSubscriptionHookResult = ReturnType<typeof useAgentStreamSubscription>;
export type AgentStreamSubscriptionResult = Apollo.SubscriptionResult<AgentStreamSubscription>;
export const GetChatStatusDocument = gql`
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

/**
 * __useGetChatStatusQuery__
 *
 * To run a query within a React component, call `useGetChatStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatStatusQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatStatusQuery(baseOptions: Apollo.QueryHookOptions<GetChatStatusQuery, GetChatStatusQueryVariables> & ({ variables: GetChatStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatStatusQuery, GetChatStatusQueryVariables>(GetChatStatusDocument, options);
      }
export function useGetChatStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatStatusQuery, GetChatStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatStatusQuery, GetChatStatusQueryVariables>(GetChatStatusDocument, options);
        }
export function useGetChatStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatStatusQuery, GetChatStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatStatusQuery, GetChatStatusQueryVariables>(GetChatStatusDocument, options);
        }
export type GetChatStatusQueryHookResult = ReturnType<typeof useGetChatStatusQuery>;
export type GetChatStatusLazyQueryHookResult = ReturnType<typeof useGetChatStatusLazyQuery>;
export type GetChatStatusSuspenseQueryHookResult = ReturnType<typeof useGetChatStatusSuspenseQuery>;
export type GetChatStatusQueryResult = Apollo.QueryResult<GetChatStatusQuery, GetChatStatusQueryVariables>;
export const GetNodeTypesDocument = gql`
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

/**
 * __useGetNodeTypesQuery__
 *
 * To run a query within a React component, call `useGetNodeTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNodeTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNodeTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNodeTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetNodeTypesQuery, GetNodeTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNodeTypesQuery, GetNodeTypesQueryVariables>(GetNodeTypesDocument, options);
      }
export function useGetNodeTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNodeTypesQuery, GetNodeTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNodeTypesQuery, GetNodeTypesQueryVariables>(GetNodeTypesDocument, options);
        }
export function useGetNodeTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNodeTypesQuery, GetNodeTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNodeTypesQuery, GetNodeTypesQueryVariables>(GetNodeTypesDocument, options);
        }
export type GetNodeTypesQueryHookResult = ReturnType<typeof useGetNodeTypesQuery>;
export type GetNodeTypesLazyQueryHookResult = ReturnType<typeof useGetNodeTypesLazyQuery>;
export type GetNodeTypesSuspenseQueryHookResult = ReturnType<typeof useGetNodeTypesSuspenseQuery>;
export type GetNodeTypesQueryResult = Apollo.QueryResult<GetNodeTypesQuery, GetNodeTypesQueryVariables>;
export const GetWorkflowsDocument = gql`
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

/**
 * __useGetWorkflowsQuery__
 *
 * To run a query within a React component, call `useGetWorkflowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkflowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkflowsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkflowsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkflowsQuery, GetWorkflowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkflowsQuery, GetWorkflowsQueryVariables>(GetWorkflowsDocument, options);
      }
export function useGetWorkflowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkflowsQuery, GetWorkflowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkflowsQuery, GetWorkflowsQueryVariables>(GetWorkflowsDocument, options);
        }
export function useGetWorkflowsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkflowsQuery, GetWorkflowsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkflowsQuery, GetWorkflowsQueryVariables>(GetWorkflowsDocument, options);
        }
export type GetWorkflowsQueryHookResult = ReturnType<typeof useGetWorkflowsQuery>;
export type GetWorkflowsLazyQueryHookResult = ReturnType<typeof useGetWorkflowsLazyQuery>;
export type GetWorkflowsSuspenseQueryHookResult = ReturnType<typeof useGetWorkflowsSuspenseQuery>;
export type GetWorkflowsQueryResult = Apollo.QueryResult<GetWorkflowsQuery, GetWorkflowsQueryVariables>;
export const GetWorkflowDocument = gql`
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

/**
 * __useGetWorkflowQuery__
 *
 * To run a query within a React component, call `useGetWorkflowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkflowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkflowQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWorkflowQuery(baseOptions: Apollo.QueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables> & ({ variables: GetWorkflowQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, options);
      }
export function useGetWorkflowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, options);
        }
export function useGetWorkflowSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkflowQuery, GetWorkflowQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, options);
        }
export type GetWorkflowQueryHookResult = ReturnType<typeof useGetWorkflowQuery>;
export type GetWorkflowLazyQueryHookResult = ReturnType<typeof useGetWorkflowLazyQuery>;
export type GetWorkflowSuspenseQueryHookResult = ReturnType<typeof useGetWorkflowSuspenseQuery>;
export type GetWorkflowQueryResult = Apollo.QueryResult<GetWorkflowQuery, GetWorkflowQueryVariables>;
export const SaveWorkflowDocument = gql`
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
export type SaveWorkflowMutationFn = Apollo.MutationFunction<SaveWorkflowMutation, SaveWorkflowMutationVariables>;

/**
 * __useSaveWorkflowMutation__
 *
 * To run a mutation, you first call `useSaveWorkflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveWorkflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveWorkflowMutation, { data, loading, error }] = useSaveWorkflowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveWorkflowMutation(baseOptions?: Apollo.MutationHookOptions<SaveWorkflowMutation, SaveWorkflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveWorkflowMutation, SaveWorkflowMutationVariables>(SaveWorkflowDocument, options);
      }
export type SaveWorkflowMutationHookResult = ReturnType<typeof useSaveWorkflowMutation>;
export type SaveWorkflowMutationResult = Apollo.MutationResult<SaveWorkflowMutation>;
export type SaveWorkflowMutationOptions = Apollo.BaseMutationOptions<SaveWorkflowMutation, SaveWorkflowMutationVariables>;
export const DeleteWorkflowDocument = gql`
    mutation DeleteWorkflow($id: ID!) {
  deleteWorkflow(id: $id)
}
    `;
export type DeleteWorkflowMutationFn = Apollo.MutationFunction<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>;

/**
 * __useDeleteWorkflowMutation__
 *
 * To run a mutation, you first call `useDeleteWorkflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkflowMutation, { data, loading, error }] = useDeleteWorkflowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkflowMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>(DeleteWorkflowDocument, options);
      }
export type DeleteWorkflowMutationHookResult = ReturnType<typeof useDeleteWorkflowMutation>;
export type DeleteWorkflowMutationResult = Apollo.MutationResult<DeleteWorkflowMutation>;
export type DeleteWorkflowMutationOptions = Apollo.BaseMutationOptions<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>;
export const ExecuteWorkflowDocument = gql`
    mutation ExecuteWorkflow($id: ID!, $input: JSON!) {
  executeWorkflow(id: $id, input: $input) {
    executionId
    workflowId
    status
    startedAt
  }
}
    `;
export type ExecuteWorkflowMutationFn = Apollo.MutationFunction<ExecuteWorkflowMutation, ExecuteWorkflowMutationVariables>;

/**
 * __useExecuteWorkflowMutation__
 *
 * To run a mutation, you first call `useExecuteWorkflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteWorkflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeWorkflowMutation, { data, loading, error }] = useExecuteWorkflowMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExecuteWorkflowMutation(baseOptions?: Apollo.MutationHookOptions<ExecuteWorkflowMutation, ExecuteWorkflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExecuteWorkflowMutation, ExecuteWorkflowMutationVariables>(ExecuteWorkflowDocument, options);
      }
export type ExecuteWorkflowMutationHookResult = ReturnType<typeof useExecuteWorkflowMutation>;
export type ExecuteWorkflowMutationResult = Apollo.MutationResult<ExecuteWorkflowMutation>;
export type ExecuteWorkflowMutationOptions = Apollo.BaseMutationOptions<ExecuteWorkflowMutation, ExecuteWorkflowMutationVariables>;
export const GetWorkflowExecutionDocument = gql`
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

/**
 * __useGetWorkflowExecutionQuery__
 *
 * To run a query within a React component, call `useGetWorkflowExecutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkflowExecutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkflowExecutionQuery({
 *   variables: {
 *      executionId: // value for 'executionId'
 *   },
 * });
 */
export function useGetWorkflowExecutionQuery(baseOptions: Apollo.QueryHookOptions<GetWorkflowExecutionQuery, GetWorkflowExecutionQueryVariables> & ({ variables: GetWorkflowExecutionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkflowExecutionQuery, GetWorkflowExecutionQueryVariables>(GetWorkflowExecutionDocument, options);
      }
export function useGetWorkflowExecutionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkflowExecutionQuery, GetWorkflowExecutionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkflowExecutionQuery, GetWorkflowExecutionQueryVariables>(GetWorkflowExecutionDocument, options);
        }
export function useGetWorkflowExecutionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkflowExecutionQuery, GetWorkflowExecutionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkflowExecutionQuery, GetWorkflowExecutionQueryVariables>(GetWorkflowExecutionDocument, options);
        }
export type GetWorkflowExecutionQueryHookResult = ReturnType<typeof useGetWorkflowExecutionQuery>;
export type GetWorkflowExecutionLazyQueryHookResult = ReturnType<typeof useGetWorkflowExecutionLazyQuery>;
export type GetWorkflowExecutionSuspenseQueryHookResult = ReturnType<typeof useGetWorkflowExecutionSuspenseQuery>;
export type GetWorkflowExecutionQueryResult = Apollo.QueryResult<GetWorkflowExecutionQuery, GetWorkflowExecutionQueryVariables>;
export const GetWorkflowExecutionsDocument = gql`
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

/**
 * __useGetWorkflowExecutionsQuery__
 *
 * To run a query within a React component, call `useGetWorkflowExecutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkflowExecutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkflowExecutionsQuery({
 *   variables: {
 *      workflowId: // value for 'workflowId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorkflowExecutionsQuery(baseOptions: Apollo.QueryHookOptions<GetWorkflowExecutionsQuery, GetWorkflowExecutionsQueryVariables> & ({ variables: GetWorkflowExecutionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkflowExecutionsQuery, GetWorkflowExecutionsQueryVariables>(GetWorkflowExecutionsDocument, options);
      }
export function useGetWorkflowExecutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkflowExecutionsQuery, GetWorkflowExecutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkflowExecutionsQuery, GetWorkflowExecutionsQueryVariables>(GetWorkflowExecutionsDocument, options);
        }
export function useGetWorkflowExecutionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkflowExecutionsQuery, GetWorkflowExecutionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkflowExecutionsQuery, GetWorkflowExecutionsQueryVariables>(GetWorkflowExecutionsDocument, options);
        }
export type GetWorkflowExecutionsQueryHookResult = ReturnType<typeof useGetWorkflowExecutionsQuery>;
export type GetWorkflowExecutionsLazyQueryHookResult = ReturnType<typeof useGetWorkflowExecutionsLazyQuery>;
export type GetWorkflowExecutionsSuspenseQueryHookResult = ReturnType<typeof useGetWorkflowExecutionsSuspenseQuery>;
export type GetWorkflowExecutionsQueryResult = Apollo.QueryResult<GetWorkflowExecutionsQuery, GetWorkflowExecutionsQueryVariables>;
export const GetNodeTracesDocument = gql`
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

/**
 * __useGetNodeTracesQuery__
 *
 * To run a query within a React component, call `useGetNodeTracesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNodeTracesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNodeTracesQuery({
 *   variables: {
 *      executionId: // value for 'executionId'
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetNodeTracesQuery(baseOptions: Apollo.QueryHookOptions<GetNodeTracesQuery, GetNodeTracesQueryVariables> & ({ variables: GetNodeTracesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNodeTracesQuery, GetNodeTracesQueryVariables>(GetNodeTracesDocument, options);
      }
export function useGetNodeTracesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNodeTracesQuery, GetNodeTracesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNodeTracesQuery, GetNodeTracesQueryVariables>(GetNodeTracesDocument, options);
        }
export function useGetNodeTracesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNodeTracesQuery, GetNodeTracesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNodeTracesQuery, GetNodeTracesQueryVariables>(GetNodeTracesDocument, options);
        }
export type GetNodeTracesQueryHookResult = ReturnType<typeof useGetNodeTracesQuery>;
export type GetNodeTracesLazyQueryHookResult = ReturnType<typeof useGetNodeTracesLazyQuery>;
export type GetNodeTracesSuspenseQueryHookResult = ReturnType<typeof useGetNodeTracesSuspenseQuery>;
export type GetNodeTracesQueryResult = Apollo.QueryResult<GetNodeTracesQuery, GetNodeTracesQueryVariables>;
export const DebugNodeDocument = gql`
    mutation DebugNode($input: DebugNodeInput!) {
  debugNode(input: $input) {
    success
    output
    error
    duration
  }
}
    `;
export type DebugNodeMutationFn = Apollo.MutationFunction<DebugNodeMutation, DebugNodeMutationVariables>;

/**
 * __useDebugNodeMutation__
 *
 * To run a mutation, you first call `useDebugNodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDebugNodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [debugNodeMutation, { data, loading, error }] = useDebugNodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDebugNodeMutation(baseOptions?: Apollo.MutationHookOptions<DebugNodeMutation, DebugNodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DebugNodeMutation, DebugNodeMutationVariables>(DebugNodeDocument, options);
      }
export type DebugNodeMutationHookResult = ReturnType<typeof useDebugNodeMutation>;
export type DebugNodeMutationResult = Apollo.MutationResult<DebugNodeMutation>;
export type DebugNodeMutationOptions = Apollo.BaseMutationOptions<DebugNodeMutation, DebugNodeMutationVariables>;
export const GetCredentialTypesDocument = gql`
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

/**
 * __useGetCredentialTypesQuery__
 *
 * To run a query within a React component, call `useGetCredentialTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCredentialTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCredentialTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCredentialTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetCredentialTypesQuery, GetCredentialTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCredentialTypesQuery, GetCredentialTypesQueryVariables>(GetCredentialTypesDocument, options);
      }
export function useGetCredentialTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCredentialTypesQuery, GetCredentialTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCredentialTypesQuery, GetCredentialTypesQueryVariables>(GetCredentialTypesDocument, options);
        }
export function useGetCredentialTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCredentialTypesQuery, GetCredentialTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCredentialTypesQuery, GetCredentialTypesQueryVariables>(GetCredentialTypesDocument, options);
        }
export type GetCredentialTypesQueryHookResult = ReturnType<typeof useGetCredentialTypesQuery>;
export type GetCredentialTypesLazyQueryHookResult = ReturnType<typeof useGetCredentialTypesLazyQuery>;
export type GetCredentialTypesSuspenseQueryHookResult = ReturnType<typeof useGetCredentialTypesSuspenseQuery>;
export type GetCredentialTypesQueryResult = Apollo.QueryResult<GetCredentialTypesQuery, GetCredentialTypesQueryVariables>;
export const GetCredentialsDocument = gql`
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

/**
 * __useGetCredentialsQuery__
 *
 * To run a query within a React component, call `useGetCredentialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCredentialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCredentialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCredentialsQuery(baseOptions?: Apollo.QueryHookOptions<GetCredentialsQuery, GetCredentialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCredentialsQuery, GetCredentialsQueryVariables>(GetCredentialsDocument, options);
      }
export function useGetCredentialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCredentialsQuery, GetCredentialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCredentialsQuery, GetCredentialsQueryVariables>(GetCredentialsDocument, options);
        }
export function useGetCredentialsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCredentialsQuery, GetCredentialsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCredentialsQuery, GetCredentialsQueryVariables>(GetCredentialsDocument, options);
        }
export type GetCredentialsQueryHookResult = ReturnType<typeof useGetCredentialsQuery>;
export type GetCredentialsLazyQueryHookResult = ReturnType<typeof useGetCredentialsLazyQuery>;
export type GetCredentialsSuspenseQueryHookResult = ReturnType<typeof useGetCredentialsSuspenseQuery>;
export type GetCredentialsQueryResult = Apollo.QueryResult<GetCredentialsQuery, GetCredentialsQueryVariables>;
export const GetCredentialDocument = gql`
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

/**
 * __useGetCredentialQuery__
 *
 * To run a query within a React component, call `useGetCredentialQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCredentialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCredentialQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCredentialQuery(baseOptions: Apollo.QueryHookOptions<GetCredentialQuery, GetCredentialQueryVariables> & ({ variables: GetCredentialQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCredentialQuery, GetCredentialQueryVariables>(GetCredentialDocument, options);
      }
export function useGetCredentialLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCredentialQuery, GetCredentialQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCredentialQuery, GetCredentialQueryVariables>(GetCredentialDocument, options);
        }
export function useGetCredentialSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCredentialQuery, GetCredentialQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCredentialQuery, GetCredentialQueryVariables>(GetCredentialDocument, options);
        }
export type GetCredentialQueryHookResult = ReturnType<typeof useGetCredentialQuery>;
export type GetCredentialLazyQueryHookResult = ReturnType<typeof useGetCredentialLazyQuery>;
export type GetCredentialSuspenseQueryHookResult = ReturnType<typeof useGetCredentialSuspenseQuery>;
export type GetCredentialQueryResult = Apollo.QueryResult<GetCredentialQuery, GetCredentialQueryVariables>;
export const CreateCredentialDocument = gql`
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
export type CreateCredentialMutationFn = Apollo.MutationFunction<CreateCredentialMutation, CreateCredentialMutationVariables>;

/**
 * __useCreateCredentialMutation__
 *
 * To run a mutation, you first call `useCreateCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCredentialMutation, { data, loading, error }] = useCreateCredentialMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCredentialMutation(baseOptions?: Apollo.MutationHookOptions<CreateCredentialMutation, CreateCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCredentialMutation, CreateCredentialMutationVariables>(CreateCredentialDocument, options);
      }
export type CreateCredentialMutationHookResult = ReturnType<typeof useCreateCredentialMutation>;
export type CreateCredentialMutationResult = Apollo.MutationResult<CreateCredentialMutation>;
export type CreateCredentialMutationOptions = Apollo.BaseMutationOptions<CreateCredentialMutation, CreateCredentialMutationVariables>;
export const UpdateCredentialDocument = gql`
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
export type UpdateCredentialMutationFn = Apollo.MutationFunction<UpdateCredentialMutation, UpdateCredentialMutationVariables>;

/**
 * __useUpdateCredentialMutation__
 *
 * To run a mutation, you first call `useUpdateCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCredentialMutation, { data, loading, error }] = useUpdateCredentialMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCredentialMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCredentialMutation, UpdateCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCredentialMutation, UpdateCredentialMutationVariables>(UpdateCredentialDocument, options);
      }
export type UpdateCredentialMutationHookResult = ReturnType<typeof useUpdateCredentialMutation>;
export type UpdateCredentialMutationResult = Apollo.MutationResult<UpdateCredentialMutation>;
export type UpdateCredentialMutationOptions = Apollo.BaseMutationOptions<UpdateCredentialMutation, UpdateCredentialMutationVariables>;
export const DeleteCredentialDocument = gql`
    mutation DeleteCredential($id: ID!) {
  deleteCredential(id: $id)
}
    `;
export type DeleteCredentialMutationFn = Apollo.MutationFunction<DeleteCredentialMutation, DeleteCredentialMutationVariables>;

/**
 * __useDeleteCredentialMutation__
 *
 * To run a mutation, you first call `useDeleteCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCredentialMutation, { data, loading, error }] = useDeleteCredentialMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCredentialMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCredentialMutation, DeleteCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCredentialMutation, DeleteCredentialMutationVariables>(DeleteCredentialDocument, options);
      }
export type DeleteCredentialMutationHookResult = ReturnType<typeof useDeleteCredentialMutation>;
export type DeleteCredentialMutationResult = Apollo.MutationResult<DeleteCredentialMutation>;
export type DeleteCredentialMutationOptions = Apollo.BaseMutationOptions<DeleteCredentialMutation, DeleteCredentialMutationVariables>;