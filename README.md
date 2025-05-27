# @gravityai-dev/gravity-ai

React component library for rendering AI-powered experiences from the Gravity AI platform. This library handles the client-side rendering of dynamic components, messages, and interactions controlled by the Gravity server.

## What is Gravity AI?

Gravity AI is an AI Experience Platform that goes beyond traditional chat interfaces. Instead of limiting AI to text responses, Gravity enables rich, interactive experiences through server-controlled component rendering.

**Key Concept**: The server decides what components to render based on AI understanding and context. This library provides the React components to render those experiences.

## Features

- **Server-controlled rendering** - Components determined dynamically by Gravity server
- **React components** - Pre-built components for all Gravity message types  
- **Real-time streaming** - Live updates via GraphQL subscriptions
- **Message handling** - Automatic parsing and rendering of Gravity messages
- **Simple integration** - Drop into any React app with minimal setup

## Installation

```bash
npm install @gravityai-dev/gravity-ai
# or
yarn add @gravityai-dev/gravity-ai
# or
pnpm add @gravityai-dev/gravity-ai
```

## Quick Start

### Basic Setup

Connect to your Gravity server and render AI-controlled experiences:

```typescript
import { GravityProvider, useGravity, MessageRenderer } from '@gravityai-dev/gravity-ai';

function App() {
  return (
    <GravityProvider config={{ 
      endpoint: 'https://your-gravity-server.com/graphql',
      apiKey: 'your-api-key'
    }}>
      <GravityExperience />
    </GravityProvider>
  );
}

function GravityExperience() {
  const { sendMessage, messages, isConnected } = useGravity();
  
  const handleUserInput = (input) => {
    // Send user input to Gravity server
    // Server will respond with appropriate components
    sendMessage({
      message: input,
      userId: 'user-123',
      conversationId: 'conv-456'
    });
  };
  
  return (
    <div className="gravity-container">
      {/* Render whatever components the server decides */}
      {messages.map(message => (
        <MessageRenderer key={message.id} message={message} />
      ))}
      
      <input 
        onSubmit={handleUserInput}
        disabled={!isConnected}
        placeholder="Ask anything..."
      />
    </div>
  );
}
```

## Chat States

Track conversation lifecycle:
- `idle` / `IDLE` - Initial state
- `connecting` / `CONNECTING` - Establishing connection
- `connected` / `CONNECTED` - Ready to send/receive
- `streaming` / `STREAMING` - AI is responding
- `complete` / `COMPLETE` - Response finished
- `error` / `ERROR` - Error occurred
- `cancelled` / `CANCELLED` - User cancelled

## Advanced Usage

### Custom Message Rendering

```typescript
import { MessageRenderer, useGravity } from '@gravityai-dev/gravity-ai';

function CustomExperience() {
  const { messages } = useGravity();
  
  return (
    <div className="experience-messages">
      {messages.map(message => (
        <div key={message.id} className="message-wrapper">
          <MessageRenderer 
            message={message}
            className="custom-message"
            showTimestamp={true}
            showAvatar={true}
          />
        </div>
      ))}
    </div>
  );
}
```

### Connection Status Handling

```typescript
import { useConnection, useGravity } from '@gravityai-dev/gravity-ai';

function ExperienceInterface() {
  const { isConnected, connectionState, error } = useConnection();
  const { sendMessage } = useGravity();
  
  if (error) {
    return <div className="error">Connection error: {error.message}</div>;
  }
  
  return (
    <div>
      <div className="status">
        Status: {connectionState} {isConnected ? '🟢' : '🔴'}
      </div>
      <button 
        onClick={() => sendMessage({ message: 'Hello!' })}
        disabled={!isConnected}
      >
        Send Message
      </button>
    </div>
  );
}
```

### Real-time Response Handling

```typescript
import { useActiveResponse } from '@gravityai-dev/gravity-ai';

function StreamingResponse() {
  const { activeResponse, isStreaming } = useActiveResponse();
  
  return (
    <div className="streaming-container">
      {isStreaming && (
        <div className="streaming-indicator">AI is typing...</div>
      )}
      
      {activeResponse?.currentMessageChunk && (
        <div className="current-chunk">
          {activeResponse.currentMessageChunk.text}
          {isStreaming && <span className="cursor">|</span>}
        </div>
      )}
      
      {activeResponse?.progressUpdate && (
        <div className="progress">
          {activeResponse.progressUpdate.message}
        </div>
      )}
    </div>
  );
}
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  GravityConfig,
  BaseMessage,
  ChatState,
  MessageType,
  ActiveResponse
} from '@gravityai-dev/gravity-ai';
```

## Requirements

- React 18+
- TypeScript 4.5+ (recommended)
- Modern browser with WebSocket support

## License

MIT

---

Built with ❤️ by the Gravity AI Team
