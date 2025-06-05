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
  message: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
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
  workflow?: Maybe<WorkflowContext>;
};

export type DeleteExecutionsResult = {
  __typename?: 'DeleteExecutionsResult';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ExecutionSummary = {
  __typename?: 'ExecutionSummary';
  averageNodeDuration?: Maybe<Scalars['Float']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  completedNodes: Scalars['Int']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  executionId: Scalars['ID']['output'];
  failedNodes: Scalars['Int']['output'];
  startedAt: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalNodes: Scalars['Int']['output'];
  workflowId: Scalars['ID']['output'];
  workflowName?: Maybe<Scalars['String']['output']>;
};

export type ExecutionTimelineItem = {
  __typename?: 'ExecutionTimelineItem';
  duration?: Maybe<Scalars['Float']['output']>;
  endTime?: Maybe<Scalars['Float']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  inputs?: Maybe<Scalars['JSON']['output']>;
  nodeId: Scalars['ID']['output'];
  nodeName?: Maybe<Scalars['String']['output']>;
  nodeType: Scalars['String']['output'];
  outputs?: Maybe<Scalars['JSON']['output']>;
  relativeEnd?: Maybe<Scalars['Float']['output']>;
  relativeStart: Scalars['Float']['output'];
  startTime: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  healthy: Scalars['Boolean']['output'];
  warnings: Array<Scalars['String']['output']>;
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
  deleteAllExecutions: DeleteExecutionsResult;
  deleteCredential: Scalars['Boolean']['output'];
  deleteWorkflow: Scalars['Boolean']['output'];
  executeWorkflow: WorkflowExecution;
  resetQueueMetrics: Scalars['Boolean']['output'];
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


export type MutationDeleteAllExecutionsArgs = {
  workflowId: Scalars['ID']['input'];
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


export type MutationResetQueueMetricsArgs = {
  queueName?: InputMaybe<Scalars['String']['input']>;
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

export type NodePerformance = {
  __typename?: 'NodePerformance';
  averageDuration: Scalars['Float']['output'];
  executionCount: Scalars['Int']['output'];
  lastExecuted: Scalars['String']['output'];
  maxDuration: Scalars['Float']['output'];
  minDuration: Scalars['Float']['output'];
  nodeId: Scalars['ID']['output'];
  nodeType: Scalars['String']['output'];
  successRate: Scalars['Float']['output'];
};

export type NodePort = {
  __typename?: 'NodePort';
  description?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  testData?: Maybe<Scalars['JSON']['output']>;
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
  executionSummary?: Maybe<ExecutionSummary>;
  executionTimeline: Array<ExecutionTimelineItem>;
  getChatStatus: ChatStatus;
  introspectAgentTypes?: Maybe<AgentTypeInfo>;
  mcpStatus: ProviderStatus;
  mcpTools: McpToolsResponse;
  n8nStatus: ProviderStatus;
  nodePerformanceMetrics: Array<NodePerformance>;
  nodeTraces: Array<NodeTrace>;
  nodeTypes: Array<NodeType>;
  ping: Scalars['String']['output'];
  systemPerformanceMetrics: SystemPerformanceMetrics;
  workflow?: Maybe<Workflow>;
  workflowExecution?: Maybe<WorkflowExecution>;
  workflowExecutions: Array<WorkflowExecution>;
  workflowPerformanceOverview?: Maybe<WorkflowPerformanceOverview>;
  workflows: Array<Workflow>;
};


export type QueryCredentialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExecutionSummaryArgs = {
  executionId: Scalars['ID']['input'];
};


export type QueryExecutionTimelineArgs = {
  executionId: Scalars['ID']['input'];
};


export type QueryGetChatStatusArgs = {
  chatId: Scalars['ID']['input'];
};


export type QueryNodePerformanceMetricsArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  workflowId?: InputMaybe<Scalars['ID']['input']>;
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


export type QueryWorkflowPerformanceOverviewArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  workflowId: Scalars['ID']['input'];
};

export type QueueMetrics = {
  __typename?: 'QueueMetrics';
  active: Scalars['Int']['output'];
  avgProcessingTime: Scalars['Float']['output'];
  completed: Scalars['Int']['output'];
  delayed: Scalars['Int']['output'];
  failed: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  paused: Scalars['Int']['output'];
  throughput: Scalars['Float']['output'];
  waiting: Scalars['Int']['output'];
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

export type SystemMetrics = {
  __typename?: 'SystemMetrics';
  cpuUsage: Scalars['Float']['output'];
  memoryUsage: Scalars['Float']['output'];
  redisConnections: Scalars['Int']['output'];
  redisMemory: Scalars['String']['output'];
  redisOps: Scalars['Int']['output'];
  workerCount: Scalars['Int']['output'];
};

export type SystemPerformanceMetrics = {
  __typename?: 'SystemPerformanceMetrics';
  health: HealthStatus;
  queues: Array<QueueMetrics>;
  system: SystemMetrics;
  timestamp: Scalars['String']['output'];
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
  isCached: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nodes: Scalars['JSON']['output'];
  updatedAt: Scalars['String']['output'];
};

export type WorkflowContext = {
  __typename?: 'WorkflowContext';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  variables: Scalars['JSON']['output'];
};

export type WorkflowExecution = {
  __typename?: 'WorkflowExecution';
  completedAt?: Maybe<Scalars['String']['output']>;
  executionId: Scalars['ID']['output'];
  result?: Maybe<Scalars['JSON']['output']>;
  startedAt: Scalars['String']['output'];
  status: Scalars['String']['output'];
  wasFromCache: Scalars['Boolean']['output'];
  workflowId: Scalars['ID']['output'];
};

export type WorkflowInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  edges: Scalars['JSON']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  nodes: Scalars['JSON']['input'];
};

export type WorkflowPerformanceOverview = {
  __typename?: 'WorkflowPerformanceOverview';
  averageDuration?: Maybe<Scalars['Float']['output']>;
  failedExecutions: Scalars['Int']['output'];
  maxDuration?: Maybe<Scalars['Float']['output']>;
  medianDuration?: Maybe<Scalars['Float']['output']>;
  minDuration?: Maybe<Scalars['Float']['output']>;
  p95Duration?: Maybe<Scalars['Float']['output']>;
  successRate: Scalars['Float']['output'];
  successfulExecutions: Scalars['Int']['output'];
  totalExecutions: Scalars['Int']['output'];
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