# @gravityai-dev/gravity-ai

A unified library for real-time AI messaging with clean separation between core, client, and server components.

## Features

- 🚀 **Real-time streaming** - Stream AI responses in real-time via GraphQL subscriptions
- 🔌 **Platform Agnostic** - Works with any Node.js application, n8n, LangChain, etc.
- 📡 **Modular architecture** - Separate imports for client and server components
- 🎯 **Type-safe** - Full TypeScript support with comprehensive type definitions
- 🎨 **Rich message types** - Support for text, MDX, images, JSON data, and more
- 🎭 **Theme support** - Built-in Tailwind theme provider with multiple variants
- 🔧 **Easy integration** - Simple hooks and components for React applications

## Installation

```bash
npm install @gravityai-dev/gravity-ai
# or
yarn add @gravityai-dev/gravity-ai
# or
pnpm add @gravityai-dev/gravity-ai
```

## Quick Start

### Client Usage

```typescript
import { GravityProvider, useGravity, MessageRenderer } from '@gravityai-dev/gravity-ai/client';

function App() {
  return (
    <GravityProvider config={{ 
      endpoint: 'https://api.gravityai.dev/graphql',
      apiKey: 'your-api-key'  // Required for authentication
    }}>
      <ChatInterface />
    </GravityProvider>
  );
}

function ChatInterface() {
  const { sendMessage, messages, isConnected } = useGravity();
  
  return (
    <div>
      {messages.map(message => (
        <MessageRenderer key={message.id} message={message} />
      ))}
    </div>
  );
}
```

### Server Usage

```typescript
import { Publisher } from '@gravityai-dev/gravity-ai/server';

// Initialize publisher
const publisher = Publisher.fromCredentials(
  'https://api.gravityai.dev',  // Your Gravity server URL
  'your-api-key',                // Your API key
  'my-service'                   // Your service identifier
);

// Send messages
await publisher.publishText({
  chatId: 'chat-123',
  conversationId: 'conv-456',
  userId: 'user-789'
}, 'Hello from my service!');
```

### Event Subscription

```typescript
import { EventBus } from '@gravityai-dev/gravity-ai/server';

// Create event bus
const eventBus = EventBus.fromCredentials(
  'https://api.gravityai.dev',
  'your-api-key',
  'my-service'
);

// Subscribe to messages
await eventBus.subscribe('gravity:query', async (event) => {
  console.log('Received:', event);
  // Process the message
});
```

## Core Components

### Client Components

#### GravityProvider
Main provider component that wraps your application:
- Manages GraphQL client connection
- Provides context for all child components
- Handles authentication and configuration

#### Hooks
- `useGravity()` - Main hook for accessing Gravity functionality
- `useActiveResponse()` - Track current AI response state
- `useConnection()` - Monitor connection status

#### Message Components
Pre-built React components for each message type:
- `MessageChunk` - Streaming text chunks
- `Text` - Complete text messages
- `JsonData` - Structured data display
- `MdxComponent` - Rich MDX content
- `ImageResponse` - Image display with alt text
- `ToolOutput` - Tool/function results
- `ActionSuggestion` - Interactive action buttons
- `ProgressUpdate` - Status indicators
- `Metadata` - Additional context

### Server Components

#### Publisher
Send messages to any Gravity channel:
- `publishMessageChunk()` - Stream text chunks
- `publishText()` - Send complete messages
- `publishJsonData()` - Send structured data
- `publishProgressUpdate()` - Send status updates
- `publishSystem()` - System-level messages
- `publishEvent()` - Custom events
- `completeSession()` - Mark conversation complete

#### EventBus
Subscribe to Gravity events:
- `subscribe(channel, handler)` - Listen for messages
- `unsubscribe()` - Stop listening
- `publish(channel, data)` - Publish to a channel

### Message Types

All message types support both client (`__typename`) and server (`type`) formats:

```typescript
// Client format
{
  __typename: 'Text',
  text: 'Hello world',
  chatId: '...',
  conversationId: '...',
  userId: '...'
}

// Server format
{
  type: 'text',
  text: 'Hello world',
  id: '...',
  providerId: '...',
  timestamp: 1234567890
}
```

### Chat States

Track conversation lifecycle:
- `idle` / `IDLE` - Initial state
- `active` / `ACTIVE` - Processing in progress
- `thinking` / `THINKING` - AI is processing
- `responding` / `RESPONDING` - AI is generating response
- `waiting` / `WAITING` - Awaiting user input
- `complete` / `COMPLETE` - Finished successfully
- `error` / `ERROR` - Error occurred
- `cancelled` / `CANCELLED` - User cancelled

### Standard Channels

```typescript
import { SYSTEM_CHANNEL, AI_RESULT_CHANNEL, QUERY_MESSAGE_CHANNEL } from '@gravityai-dev/gravity-ai/server';

// Standard Gravity channels:
// SYSTEM_CHANNEL - System events ('gravity:system')
// AI_RESULT_CHANNEL - AI responses ('gravity:output')
// QUERY_MESSAGE_CHANNEL - Incoming queries ('gravity:query')
// EVENT_CHANNEL_PREFIX - Event prefix ('gravity:event:')
```

## Integration Examples

### Streaming AI Responses

```typescript
import { Publisher, createMessageChunk, createText, createBaseMessage } from '@gravityai-dev/gravity-ai/server';

const publisher = new Publisher(redisOptions, 'my-ai-service');

// Create base message with conversation context
const base = createBaseMessage({
  chatId: 'chat-123',
  conversationId: 'conv-456',
  userId: 'user-789'
});

// Stream chunks as they arrive
for await (const chunk of streamResponse) {
  await publisher.publishMessageChunk({
    ...base,
    text: chunk.text
  });
}

// Mark complete
await publisher.completeSession('conv-456', base);
```

### Event-Driven Workflows

```typescript
import { EventBus, QUERY_MESSAGE_CHANNEL } from '@gravityai-dev/gravity-ai/server';

const eventBus = EventBus.fromCredentials(
  'https://api.gravityai.dev',
  'your-api-key',
  'workflow-processor'
);

await eventBus.subscribe(QUERY_MESSAGE_CHANNEL, async (message) => {
  // Process the incoming message
  console.log('Received:', message);
  // Trigger your workflow logic here
});
```

### AI Agent Integration

```typescript
import { Publisher, AI_RESULT_CHANNEL } from '@gravityai-dev/gravity-ai/server';

const publisher = Publisher.fromCredentials(
  process.env.GRAVITY_URL!,
  process.env.GRAVITY_API_KEY!,
  'ai-agent'
);

// After processing with your AI
const result = await processWithAI(input);

await publisher.publishText({
  chatId: input.chatId,
  conversationId: input.conversationId,
  userId: input.userId
}, result.text);
```

## Architecture

```
@gravityai-dev/gravity-ai/
├── src/
│   ├── index.ts          # Core type exports only
│   ├── client/           # Client-side React components
│   │   ├── components/   # UI components
│   │   ├── hooks/        # React hooks
│   │   ├── messages/     # Message components
│   │   ├── store/        # Zustand store
│   │   └── theme/        # Tailwind theme
│   ├── server/           # Server-side SDK
│   │   ├── messaging/    # Publisher & EventBus
│   │   └── RedisManager.ts
│   └── shared/           # Shared types
│       └── types.ts      # Single source of truth
```

## Configuration

The SDK automatically handles Redis connection details based on your Gravity server URL:
- For cloud deployments: Redis is managed for you
- For self-hosted: Redis runs alongside your Gravity server

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { 
  GravityMessage,
  ChatState,
  BaseMessage,
  GravityConfig 
} from '@gravityai-dev/gravity-ai';
```

## License

MIT - See LICENSE file for details

## Support

- 📧 Email: support@gravityai.dev
- 💬 Discord: [Join our community](https://discord.gg/gravity-ai)
- 📚 Docs: [Full documentation](https://docs.gravityai.dev)
- 🐛 Issues: [GitHub Issues](https://github.com/gravityai-dev/gravity-ai/issues)

## Gravity Cloud

Need a hosted solution? Check out [Gravity Cloud](https://gravityai.dev) for:
- Managed infrastructure
- Built-in monitoring
- Auto-scaling
- Enterprise support

---

Built with ❤️ by the Gravity AI Team
