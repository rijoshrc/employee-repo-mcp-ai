# Product Requirements Document (PRD)

# Podio AI Chat Assistant

## 1. Executive Summary

### 1.1 Product Overview

The Podio AI Chat Assistant is a web-based application that enables users to interact with their Podio data through natural language queries. Users authenticate via Podio OAuth, provide a specific item ID, and can ask questions about that item's data, comments, files, and related information. The system uses AI to analyze user queries and intelligently determines which Podio APIs to call via MCP (Model Context Protocol) to provide relevant responses.

### 1.2 Target Users

- **Primary**: Podio users who need quick insights from their item data
- **Secondary**: Team managers and project leads who need summarized information
- **Tertiary**: HR professionals and administrators managing Podio workspaces

### 1.3 Key Value Propositions

- **Natural Language Interface**: Query Podio data using conversational language
- **Intelligent Data Retrieval**: AI determines what data to fetch based on user questions
- **Focused Context**: Each chat session revolves around a specific Podio item
- **Real-time Insights**: Get instant answers without manual data analysis
- **Secure Access**: Leverages existing Podio permissions and authentication

## 2. Product Goals & Success Metrics

### 2.1 Primary Goals

- Reduce time spent manually analyzing Podio item data by 80%
- Provide instant access to item insights through natural language
- Maintain data security and access control through Podio integration
- Create an intuitive chat interface for non-technical users

### 2.2 Success Metrics

- **User Adoption**: 70% of target users actively using the chat within 3 months
- **Response Time**: Average response time under 3 seconds
- **Accuracy**: 95% of responses accurately reflect Podio data
- **User Satisfaction**: 4.5+ star rating from user feedback
- **Session Duration**: Average chat session of 5+ interactions

## 3. Technical Architecture

### 3.1 Technology Stack

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes, Node.js
- **Authentication**: NextAuth.js with Podio OAuth 2.0 integration
- **AI Integration**: Google Gemini AI (Gemini Pro or Gemini Flash)
- **MCP Integration**: Custom MCP server for Podio API calls
- **Database**: Supabase PostgreSQL for chat history and user data
- **File Storage**: Supabase Storage for files and exports
- **Real-time**: Supabase Realtime for live chat updates
- **Session Storage**: NextAuth.js JWT sessions with encrypted token storage
- **UI Components**: shadcn/ui with custom theme system
- **Testing**: Jest, React Testing Library, Playwright
- **Deployment**: Vercel or similar cloud platform

### 3.2 Storage Architecture

#### 3.2.1 Database Storage

- **Primary Database**: Supabase PostgreSQL (managed database service)
- **Database Purpose**: Store user data, chat sessions, messages, and application metadata
- **Data Types**: Structured data including user profiles, chat history, and session information
- **Advantages**: Built-in authentication, real-time subscriptions, automatic backups, and easy scaling

#### 3.2.2 File Storage

- **File Storage Service**: Supabase Storage (integrated with database)
- **File Types**: User avatars, exported chat reports, and temporary files
- **Storage Purpose**: Handle file uploads and generated exports
- **Advantages**: Integrated with Supabase auth, automatic CDN, and easy file management

#### 3.2.3 Session Storage

- **Session Storage**: NextAuth.js JWT sessions with encrypted token storage
- **Session Purpose**: Store user sessions, Podio OAuth tokens, and temporary data
- **Data Types**: OAuth tokens, user sessions, and cached API responses
- **Advantages**: Integrated with NextAuth.js, automatic session management, and secure token storage

#### 3.2.4 Environment Configuration

- **Development**: Local Supabase instance or Supabase local development
- **Staging**: Supabase project with staging environment
- **Production**: Supabase Pro plan with production environment

### 3.3 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                       │
                              ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   MCP Server    │    │   Podio API     │
                       │   (Podio Tools) │◄──►│   (OAuth/REST)  │
                       └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   AI Service    │
                       │   (OpenAI/Claude)│
                       └─────────────────┘
```

## 4. Functional Requirements

### 4.1 Authentication & User Management

#### 4.1.1 Podio OAuth Integration

- **FR-001**: Users must authenticate using Podio OAuth 2.0
- **FR-002**: System must validate Podio access tokens and refresh when needed
- **FR-003**: Users must be redirected to Podio login if not authenticated
- **FR-004**: System must store encrypted user session data
- **FR-005**: Users must be able to logout and clear session data

#### 4.1.2 User Profile Management

- **FR-006**: System must sync user profile from Podio (name, email, avatar)
- **FR-007**: System must display user information in dashboard
- **FR-008**: Users must be able to view their Podio workspace information

### 4.2 Dashboard & Navigation

#### 4.2.1 Main Dashboard

- **FR-009**: Dashboard must display welcome message with user's name
- **FR-010**: Dashboard must show "Start New Chat" button prominently
- **FR-011**: Dashboard must display recent conversations with item IDs and titles
- **FR-012**: Dashboard must show conversation timestamps and message counts
- **FR-013**: Users must be able to click on recent conversations to continue

#### 4.2.2 Navigation

- **FR-014**: Navigation must include links to Dashboard, New Chat, and Logout
- **FR-015**: Navigation must be responsive and work on mobile devices
- **FR-016**: Users must be able to navigate back to dashboard from any chat

### 4.3 Chat Interface

#### 4.3.1 New Chat Creation

- **FR-017**: Users must be able to start a new chat by entering a Podio item ID
- **FR-018**: System must validate that user has access to the specified item
- **FR-019**: System must display error message if item access is denied
- **FR-020**: System must show item title and basic info upon successful validation
- **FR-021**: System must create a new chat session in the database

#### 4.3.2 Chat Interface Components

- **FR-022**: Chat interface must display item ID and title in header
- **FR-023**: Chat must show message history with user and AI messages
- **FR-024**: Messages must be clearly distinguished (user vs AI)
- **FR-025**: Chat must include timestamp for each message
- **FR-026**: Chat must have a text input field for user queries
- **FR-027**: Chat must have a send button to submit queries
- **FR-028**: Chat must support Enter key to send messages
- **FR-029**: Chat must show typing indicator while AI is processing

#### 4.3.3 Message Handling

- **FR-030**: System must store all messages in database with timestamps
- **FR-031**: Messages must include role (user/assistant/system)
- **FR-032**: System must handle message errors gracefully
- **FR-033**: Users must be able to see message history when returning to chat
- **FR-034**: System must limit message length to prevent abuse

### 4.4 MCP Integration

#### 4.4.1 MCP Server Setup

- **FR-035**: System must implement custom MCP server for Podio integration
- **FR-036**: MCP server must handle Podio API authentication
- **FR-037**: MCP server must implement error handling and retry logic
- **FR-038**: MCP server must cache responses to improve performance

#### 4.4.2 MCP Tools Implementation

- **FR-039**: System must implement `podio:get_item_basic` tool
- **FR-040**: System must implement `podio:get_item_full` tool
- **FR-041**: System must implement `podio:get_comments` tool
- **FR-042**: System must implement `podio:get_files` tool
- **FR-043**: System must implement `podio:get_references` tool
- **FR-044**: System must implement `podio:get_item_history` tool
- **FR-045**: System must implement `podio:validate_access` tool

#### 4.4.3 Query Analysis

- **FR-046**: AI must analyze user queries to determine intent
- **FR-047**: AI must identify which MCP tools are needed for each query
- **FR-048**: System must call only relevant MCP tools based on query analysis
- **FR-049**: System must handle queries that require multiple MCP tools
- **FR-050**: System must provide fallback responses when MCP tools fail

### 4.5 AI Integration

#### 4.5.1 Query Processing

- **FR-051**: Gemini AI must understand natural language queries about Podio data
- **FR-052**: Gemini AI must generate contextual responses based on retrieved data
- **FR-053**: Gemini AI must handle ambiguous queries by asking for clarification
- **FR-054**: Gemini AI must provide helpful suggestions for follow-up questions
- **FR-055**: Gemini AI must summarize large datasets when appropriate
- **FR-056**: System must use Gemini AI to analyze query intent and determine required MCP tools
- **FR-057**: System must handle Gemini AI API rate limits and errors gracefully
- **FR-058**: System must implement retry logic for failed Gemini AI calls

#### 4.5.2 Response Generation

- **FR-059**: Gemini AI must format responses in a readable, conversational manner
- **FR-060**: Gemini AI must include relevant data points in responses
- **FR-061**: Gemini AI must provide context about data sources when relevant
- **FR-062**: Gemini AI must handle cases where no relevant data is found
- **FR-063**: Gemini AI must maintain conversation context across multiple messages
- **FR-064**: System must implement proper prompt engineering for Gemini AI
- **FR-065**: System must handle Gemini AI token limits appropriately

### 4.6 Data Management

#### 4.6.1 Chat History

- **FR-066**: System must store all chat sessions in database
- **FR-067**: System must store all messages within each session
- **FR-068**: System must allow users to view chat history
- **FR-069**: System must implement chat session cleanup for old conversations
- **FR-070**: System must backup chat data regularly

#### 4.6.2 Podio Data Caching

- **FR-071**: System must cache Podio item data to reduce API calls
- **FR-072**: System must implement cache invalidation when data changes
- **FR-073**: System must handle cache misses gracefully
- **FR-074**: System must limit cache size to prevent memory issues

#### 4.6.3 Database Management

- **FR-075**: System must implement database migrations for schema changes
- **FR-076**: System must backup database data daily with 30-day retention
- **FR-077**: System must implement database connection pooling
- **FR-078**: System must handle database connection failures gracefully
- **FR-079**: System must implement data archiving for old chat sessions (older than 1 year)

#### 4.6.4 File Storage Management

- **FR-080**: System must store user avatars from Podio in cloud storage
- **FR-081**: System must implement file upload limits and validation
- **FR-082**: System must generate and store chat export files when requested
- **FR-083**: System must implement file cleanup for temporary files
- **FR-084**: System must secure file access with proper authentication

#### 4.6.6 Large Data Handling

- **FR-090**: System must implement pagination for large comment datasets (limit to 50 comments per request)
- **FR-091**: System must implement data chunking for large item details (split into manageable chunks)
- **FR-092**: System must provide data summarization for datasets exceeding token limits
- **FR-093**: System must implement progressive loading for large file lists
- **FR-094**: System must cache large datasets with appropriate expiration times
- **FR-095**: System must implement data compression for storage efficiency
- **FR-096**: System must provide user feedback for long-running data operations
- **FR-097**: System must implement timeout handling for large data requests
- **FR-098**: System must offer data filtering options to reduce dataset size
- **FR-099**: System must implement background processing for large data operations

#### 4.6.7 Session Management

- **FR-100**: System must store user sessions in Supabase with proper expiration
- **FR-101**: System must store Podio access tokens securely in session storage
- **FR-102**: System must implement session refresh and token renewal
- **FR-103**: System must handle session expiration gracefully
- **FR-104**: System must implement session cleanup for inactive users

## 5. Non-Functional Requirements

### 5.1 Performance

- **NFR-001**: Application must load dashboard within 2 seconds
- **NFR-002**: Chat responses must be generated within 3 seconds
- **NFR-003**: System must handle concurrent users without degradation
- **NFR-004**: Database queries must be optimized for performance
- **NFR-005**: Static assets must be cached appropriately

### 5.2 Security

- **NFR-006**: All user data must be encrypted in transit and at rest
- **NFR-007**: Podio access tokens must be stored securely
- **NFR-008**: System must implement rate limiting to prevent abuse
- **NFR-009**: System must validate all user inputs
- **NFR-010**: System must implement proper error handling without data leakage

### 5.3 Scalability

- **NFR-011**: System must support 1000+ concurrent users
- **NFR-012**: Database must handle 10,000+ chat sessions
- **NFR-013**: System must implement horizontal scaling capabilities
- **NFR-014**: MCP server must handle multiple concurrent requests

### 5.4 Usability

- **NFR-015**: Interface must be intuitive for non-technical users
- **NFR-016**: Application must be responsive on desktop and mobile
- **NFR-017**: Error messages must be clear and actionable
- **NFR-018**: Loading states must provide user feedback
- **NFR-019**: Interface must follow accessibility guidelines

### 5.5 Reliability

- **NFR-020**: System must have 99.9% uptime
- **NFR-021**: System must implement automatic retry for failed API calls
- **NFR-022**: System must handle Podio API outages gracefully
- **NFR-023**: System must implement monitoring and alerting
- **NFR-024**: System must have backup and recovery procedures

## 6. User Stories

### 6.1 Authentication Stories

- **US-001**: As a user, I want to log in with my Podio account so that I can access my data securely
- **US-002**: As a user, I want to see my Podio profile information so that I know I'm logged in correctly
- **US-003**: As a user, I want to log out so that I can secure my session when done

### 6.2 Chat Management Stories

- **US-004**: As a user, I want to start a new chat by entering an item ID so that I can ask questions about specific items
- **US-005**: As a user, I want to see my recent conversations so that I can continue previous discussions
- **US-006**: As a user, I want to see the item title in my chat so that I know which item I'm discussing

### 6.3 Query Stories

- **US-007**: As a user, I want to ask "What's the status of this item?" and get a clear answer
- **US-008**: As a user, I want to ask "Summarize the comments" and get a summary of all comments
- **US-009**: As a user, I want to ask "What files are attached?" and see a list of attachments
- **US-010**: As a user, I want to ask "What changed recently?" and get recent activity information
- **US-011**: As a user, I want to ask "Tell me everything about this item" and get a comprehensive overview

### 6.4 Error Handling Stories

- **US-012**: As a user, I want to see clear error messages when I don't have access to an item
- **US-013**: As a user, I want to see helpful suggestions when my question is unclear
- **US-014**: As a user, I want the system to work even if some data is unavailable

## 7. Technical Specifications

### 7.1 Database Schema

#### 7.1.1 Core Tables

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    podio_user_id INTEGER UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat sessions table
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER REFERENCES users(id),
    podio_item_id INTEGER NOT NULL,
    item_title VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message_count INTEGER DEFAULT 0
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id),
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions table
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER REFERENCES users(id),
    podio_access_token TEXT NOT NULL,
    podio_refresh_token TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 7.1.2 Additional Tables

```sql
-- Podio data cache table
CREATE TABLE podio_cache (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id),
    data_type VARCHAR(50) NOT NULL, -- 'basic', 'full', 'comments', 'files', etc.
    data JSONB NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(item_id, user_id, data_type)
);

-- File storage table
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER REFERENCES users(id),
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100),
    storage_provider VARCHAR(50) NOT NULL, -- 's3', 'cloudinary', 'supabase'
    storage_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System settings table
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 7.1.3 Indexes for Performance

```sql
-- Performance indexes
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_created_at ON chat_sessions(created_at);
CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_podio_cache_item_user ON podio_cache(item_id, user_id);
CREATE INDEX idx_podio_cache_expires ON podio_cache(expires_at);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
```

### 7.2 API Endpoints

```typescript
// Authentication endpoints
POST / api / auth / podio / login;
GET / api / auth / podio / callback;
POST / api / auth / logout;

// Chat endpoints
POST / api / chat / sessions;
GET / api / chat / sessions;
GET / api / chat / sessions / [sessionId];
POST / api / chat / sessions / [sessionId] / messages;
GET / api / chat / sessions / [sessionId] / messages;

// Podio integration endpoints
POST / api / podio / validate - item;
GET / api / podio / item / [itemId] / basic;
GET / api / podio / item / [itemId] / full;
GET / api / podio / item / [itemId] / comments;
GET / api / podio / item / [itemId] / files;
GET / api / podio / item / [itemId] / references;
GET / api / podio / item / [itemId] / history;
```

### 7.3 MCP Tool Specifications

```typescript
// MCP Tool: podio:get_item_basic
{
  name: "podio:get_item_basic",
  description: "Get basic item information including title, status, and main fields",
  inputSchema: {
    type: "object",
    properties: {
      item_id: { type: "number", description: "Podio item ID" }
    },
    required: ["item_id"]
  }
}

// MCP Tool: podio:get_comments
{
  name: "podio:get_comments",
  description: "Get all comments and activity for an item",
  inputSchema: {
    type: "object",
    properties: {
      item_id: { type: "number", description: "Podio item ID" },
      limit: { type: "number", description: "Maximum number of comments to return" },
      offset: { type: "number", description: "Number of comments to skip" }
    },
    required: ["item_id"]
  }
}
```

### 7.4 Supabase Configuration

#### 7.4.1 Supabase Project Setup

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Podio Configuration
PODIO_CLIENT_ID=your_podio_client_id
PODIO_CLIENT_SECRET=your_podio_client_secret
PODIO_REDIRECT_URI=https://your-domain.com/api/auth/podio/callback

# Google Gemini AI Configuration
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash  # or 'gemini-1.5-pro', 'gemini-1.5-pro-latest'
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=0.7

# Application Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```

#### 7.4.2 Supabase Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE podio_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = podio_user_id::text);

-- Chat sessions belong to the user who created them
CREATE POLICY "Users can manage own chat sessions" ON chat_sessions
    FOR ALL USING (user_id = (SELECT id FROM users WHERE podio_user_id::text = auth.uid()::text));

-- Messages belong to user's chat sessions
CREATE POLICY "Users can view messages in own sessions" ON messages
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM chat_sessions
            WHERE user_id = (SELECT id FROM users WHERE podio_user_id::text = auth.uid()::text)
        )
    );

-- User sessions belong to the user
CREATE POLICY "Users can manage own sessions" ON user_sessions
    FOR ALL USING (user_id = (SELECT id FROM users WHERE podio_user_id::text = auth.uid()::text));

-- Podio cache belongs to the user
CREATE POLICY "Users can access own cached data" ON podio_cache
    FOR ALL USING (user_id = (SELECT id FROM users WHERE podio_user_id::text = auth.uid()::text));

-- Files belong to the user
CREATE POLICY "Users can manage own files" ON files
    FOR ALL USING (user_id = (SELECT id FROM users WHERE podio_user_id::text = auth.uid()::text));
```

#### 7.4.3 Supabase Storage Buckets

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('exports', 'exports', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('temp', 'temp', false);

-- Storage policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Storage policies for exports bucket
CREATE POLICY "Users can access own exports" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'exports'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can upload own exports" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'exports'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Storage policies for temp bucket
CREATE POLICY "Users can manage own temp files" ON storage.objects
    FOR ALL USING (
        bucket_id = 'temp'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
```

#### 7.4.4 Supabase Functions and Triggers

```sql
-- Function to update message count in chat_sessions
CREATE OR REPLACE FUNCTION update_message_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE chat_sessions
        SET message_count = message_count + 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.session_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE chat_sessions
        SET message_count = message_count - 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = OLD.session_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update message count
CREATE TRIGGER trigger_update_message_count
    AFTER INSERT OR DELETE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_message_count();

-- Function to clean up expired cache entries
CREATE OR REPLACE FUNCTION cleanup_expired_cache()
RETURNS void AS $$
BEGIN
    DELETE FROM podio_cache WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup job (runs daily)
SELECT cron.schedule('cleanup-expired-cache', '0 2 * * *', 'SELECT cleanup_expired_cache();');
```

#### 7.4.5 Supabase Real-time Subscriptions

```typescript
// Real-time chat updates
const chatSubscription = supabase
  .channel("chat-messages")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "messages",
      filter: `session_id=eq.${sessionId}`,
    },
    (payload) => {
      // Handle new message
      console.log("New message:", payload.new);
    }
  )
  .subscribe();

// Real-time session updates
const sessionSubscription = supabase
  .channel("chat-sessions")
  .on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "chat_sessions",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      // Handle session updates
      console.log("Session updated:", payload.new);
    }
  )
  .subscribe();
```

#### 7.4.6 Supabase Pricing and Limits

| **Plan**       | **Database** | **Storage** | **Bandwidth** | **Monthly Cost** |
| -------------- | ------------ | ----------- | ------------- | ---------------- |
| **Free**       | 500MB        | 1GB         | 2GB           | $0               |
| **Pro**        | 8GB          | 100GB       | 250GB         | $25              |
| **Team**       | 100GB        | 1TB         | 2TB           | $599             |
| **Enterprise** | Custom       | Custom      | Custom        | Custom           |

**Recommended Plan**: Start with Free tier for development, upgrade to Pro for production.

### 7.5 Gemini AI Integration

#### 7.5.1 Gemini AI Setup and Configuration

```typescript
// Gemini AI client configuration
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

// Model configuration
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS || "8192"),
    temperature: parseFloat(process.env.GEMINI_TEMPERATURE || "0.7"),
  },
});
```

#### 7.5.2 Query Analysis with Gemini AI

```typescript
// Function to analyze user queries and determine required MCP tools
async function analyzeQueryWithGemini(
  userQuery: string
): Promise<QueryAnalysis> {
  const prompt = `
You are an AI assistant that analyzes user queries about Podio data. 
Based on the user's question, determine which Podio data types are needed.

Available data types:
- basic: Basic item information (title, status, main fields)
- full: Complete item details with all field values
- comments: All comments and activity for the item
- files: File attachments for the item
- references: Referenced items (linked items, relationships)
- history: Item change history and activity log

User Query: "${userQuery}"

Respond with a JSON object containing:
{
  "intent": "brief description of what user wants",
  "needsBasicInfo": boolean,
  "needsFullDetails": boolean,
  "needsComments": boolean,
  "needsFiles": boolean,
  "needsReferences": boolean,
  "needsHistory": boolean,
  "confidence": number (0-1),
  "reasoning": "brief explanation of why these data types are needed"
}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text);
  } catch (error) {
    // Fallback analysis
    return {
      intent: "general_query",
      needsBasicInfo: true,
      needsFullDetails: false,
      needsComments: false,
      needsFiles: false,
      needsReferences: false,
      needsHistory: false,
      confidence: 0.5,
      reasoning: "Fallback analysis due to parsing error",
    };
  }
}
```

#### 7.5.3 Response Generation with Gemini AI

```typescript
// Function to generate AI responses based on Podio data
async function generateResponseWithGemini(
  userQuery: string,
  podioData: any,
  conversationHistory: Message[]
): Promise<string> {
  const context = `
You are an AI assistant helping users understand their Podio data. 
You have access to the following Podio item data:

${JSON.stringify(podioData, null, 2)}

Previous conversation context:
${conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}

User's current question: "${userQuery}"

Please provide a helpful, conversational response that:
1. Directly answers the user's question
2. Uses the Podio data provided
3. Maintains context from the conversation
4. Is clear and easy to understand
5. Includes relevant data points when appropriate
6. Suggests follow-up questions if helpful

Response:`;

  const result = await model.generateContent(context);
  const response = await result.response;
  return response.text();
}
```

#### 7.5.3 Gemini AI Error Handling

```typescript
// Error handling for Gemini AI calls
async function safeGeminiCall(
  prompt: string,
  maxRetries: number = 3
): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error(`Gemini API attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        throw new Error(
          `Gemini API failed after ${maxRetries} attempts: ${error.message}`
        );
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  throw new Error("Gemini API call failed");
}
```

#### 7.5.4 Gemini AI Model Comparison

| **Model**                 | **Speed** | **Quality** | **Cost** | **Best For**                         |
| ------------------------- | --------- | ----------- | -------- | ------------------------------------ |
| **gemini-1.5-flash**      | Fast      | Good        | Low      | Real-time chat, simple queries       |
| **gemini-1.5-pro**        | Medium    | Excellent   | Medium   | Complex analysis, detailed responses |
| **gemini-1.5-pro-latest** | Medium    | Best        | High     | Advanced reasoning, latest features  |

#### 7.5.5 Gemini AI Pricing (as of 2024)

| **Model**                 | **Input Tokens** | **Output Tokens** | **Cost per 1M tokens** |
| ------------------------- | ---------------- | ----------------- | ---------------------- |
| **gemini-1.5-flash**      | $0.075           | $0.30             | $0.375                 |
| **gemini-1.5-pro**        | $3.50            | $10.50            | $14.00                 |
| **gemini-1.5-pro-latest** | $7.00            | $21.00            | $28.00                 |

**Recommended Model**: Start with `gemini-1.5-flash` for cost-effectiveness, upgrade to `gemini-1.5-pro` for complex queries.

### 7.7 User Interface Design and Components

#### 7.7.1 shadcn/ui Setup and Configuration

```typescript
// components.json configuration
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}

// tailwind.config.ts with theme support
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

#### 7.7.2 Theme Provider and Dark Mode Support

```typescript
// lib/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// components/theme-toggle.tsx
("use client");

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

#### 7.7.5 Testing Strategy for Components

```typescript
// __tests__/components/chat/chat-interface.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { useChat } from "@/hooks/use-chat";

// Mock the useChat hook
jest.mock("@/hooks/use-chat");
const mockUseChat = useChat as jest.MockedFunction<typeof useChat>;

describe("ChatInterface", () => {
  const mockMessages = [
    {
      id: "1",
      role: "user" as const,
      content: "Hello",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      role: "assistant" as const,
      content: "Hi there! How can I help you?",
      timestamp: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    mockUseChat.mockReturnValue({
      messages: mockMessages,
      sendMessage: jest.fn(),
      loading: false,
      error: null,
    });
  });

  it("renders chat interface with messages", () => {
    render(<ChatInterface itemId="12345" />);

    expect(screen.getByText("Item #12345")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(
      screen.getByText("Hi there! How can I help you?")
    ).toBeInTheDocument();
  });

  it("sends message when user types and clicks send", async () => {
    const mockSendMessage = jest.fn();
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      loading: false,
      error: null,
    });

    render(<ChatInterface itemId="12345" />);

    const input = screen.getByPlaceholderText(
      "Ask a question about this item..."
    );
    const sendButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith("Test message");
    });
  });

  it("shows loading indicator when loading", () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: jest.fn(),
      loading: true,
      error: null,
    });

    render(<ChatInterface itemId="12345" />);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});

// __tests__/components/chat/message-bubble.test.tsx
import { render, screen } from "@testing-library/react";
import { MessageBubble } from "@/components/chat/message-bubble";

describe("MessageBubble", () => {
  const mockMessage = {
    id: "1",
    role: "user" as const,
    content: "Test message",
    timestamp: new Date().toISOString(),
  };

  it("renders user message correctly", () => {
    render(<MessageBubble message={mockMessage} />);

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("renders AI message correctly", () => {
    const aiMessage = { ...mockMessage, role: "assistant" as const };
    render(<MessageBubble message={aiMessage} />);

    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });
});

// __tests__/components/theme-toggle.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

jest.mock("next-themes");
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      setTheme: jest.fn(),
      theme: "light",
      themes: ["light", "dark", "system"],
    });
  });

  it("renders theme toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens dropdown menu on click", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });
});
```

#### 7.7.6 shadcn/ui Component Installation

```bash
# Install shadcn/ui CLI
npm install -D @shadcn/ui

# Initialize shadcn/ui
npx shadcn-ui@latest init

# Install required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add collapsible
npx shadcn-ui@latest add command
npx shadcn-ui@latest add context-menu
npx shadcn-ui@latest add form
npx shadcn-ui@latest add hover-card
npx shadcn-ui@latest add label
npx shadcn-ui@latest add menubar
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add select
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add table
npx shadcn-ui@latest add toggle
npx shadcn-ui@latest add toggle-group

# Install additional dependencies
npm install next-themes lucide-react @radix-ui/react-slot
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu
npm install @radix-ui/react-scroll-area @radix-ui/react-separator
npm install @radix-ui/react-skeleton @radix-ui/react-tooltip
npm install @radix-ui/react-dialog @radix-ui/react-sheet
npm install @radix-ui/react-navigation-menu @radix-ui/react-tabs
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-checkbox @radix-ui/react-collapsible
npm install @radix-ui/react-command @radix-ui/react-context-menu
npm install @radix-ui/react-hover-card @radix-ui/react-label
npm install @radix-ui/react-menubar @radix-ui/react-popover
npm install @radix-ui/react-radio-group @radix-ui/react-select
npm install @radix-ui/react-slider @radix-ui/react-switch
npm install @radix-ui/react-toggle @radix-ui/react-toggle-group

# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event jest jest-environment-jsdom
npm install -D @types/jest
```

#### 7.7.7 Type Definitions

```typescript
// types/chat.ts
export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  metadata?: {
    podioData?: any;
    aiModel?: string;
    tokensUsed?: number;
  };
}

export interface ChatSession {
  id: string;
  itemId: string;
  itemTitle?: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

// types/podio.ts
export interface PodioItem {
  id: number;
  title: string;
  status?: string;
  fields: Record<string, any>;
  comments?: PodioComment[];
  files?: PodioFile[];
  references?: PodioReference[];
}

export interface PodioComment {
  id: number;
  text: string;
  author: {
    name: string;
    avatar_url?: string;
  };
  created_at: string;
}

export interface PodioFile {
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
}

export interface PodioReference {
  id: number;
  title: string;
  type: string;
  url: string;
}

// types/theme.ts
export type Theme = "light" | "dark" | "system";

export interface ThemeConfig {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
```

#### 7.7.8 Custom Hooks

```typescript
// hooks/use-chat.ts
import { useState, useEffect, useCallback } from "react";
import { Message, ChatState } from "@/types/chat";

export function useChat(itemId: string) {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
  });

  const sendMessage = useCallback(
    async (content: string) => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId, message: content }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();

        setState((prev) => ({
          messages: [...prev.messages, data.message],
          loading: false,
          error: null,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        }));
      }
    },
    [itemId]
  );

  const loadMessages = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(`/api/chat/${itemId}/messages`);
      const data = await response.json();

      setState((prev) => ({
        ...prev,
        messages: data.messages,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load messages",
      }));
    }
  }, [itemId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    ...state,
    sendMessage,
    loadMessages,
  };
}

// hooks/use-theme.ts
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeDetector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme: mounted ? theme : "light",
    setTheme,
    mounted,
  };
}
```

#### 7.7.3 Modular Component Architecture

```typescript
// Component structure for modular, testable components
src/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── chat/                  # Chat-specific components
│   │   ├── chat-interface.tsx
│   │   ├── message-bubble.tsx
│   │   ├── chat-input.tsx
│   │   ├── typing-indicator.tsx
│   │   └── chat-header.tsx
│   ├── dashboard/             # Dashboard components
│   │   ├── quick-start-card.tsx
│   │   ├── recent-chats-list.tsx
│   │   ├── activity-card.tsx
│   │   └── stats-card.tsx
│   ├── data/                  # Data visualization components
│   │   ├── data-summary-card.tsx
│   │   ├── comment-list.tsx
│   │   ├── file-list.tsx
│   │   └── progress-bar.tsx
│   ├── layout/                # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── navigation.tsx
│   │   └── footer.tsx
│   └── common/                # Shared components
│       ├── loading-spinner.tsx
│       ├── error-message.tsx
│       ├── empty-state.tsx
│       └── theme-toggle.tsx
```

#### 7.7.4 shadcn/ui AI Chat Components

````typescript
// components/chat/chat-interface.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  itemId: string;
  className?: string;
}

export function ChatInterface({ itemId, className }: ChatInterfaceProps) {
  const { messages, sendMessage, loading, error } = useChat(itemId);
  const [inputValue, setInputValue] = useState("");

  const handleSend = async (message: string) => {
    if (message.trim() && !loading) {
      await sendMessage(message);
      setInputValue("");
    }
  };

  return (
    <Card className={cn("flex flex-col h-[600px]", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/podio-icon.png" alt="Podio" />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Item #{itemId}</h2>
            <p className="text-sm text-muted-foreground">
              Ask questions about this item
            </p>
          </div>
        </div>
        <Badge variant="secondary">AI Chat</Badge>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {loading && <TypingIndicator />}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          loading={loading}
          placeholder="Ask a question about this item..."
        />
      </div>
    </Card>
  );
}

// components/chat/message-bubble.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

export function MessageBubble({ message, className }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-max max-w-[80%] gap-2",
        isUser ? "ml-auto" : "mr-auto",
        className
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/ai-avatar.png" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <Card
        className={cn(
          "flex flex-col",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">
              {isUser ? "You" : "AI Assistant"}
            </span>
            <Badge variant="outline" className="text-xs">
              {new Date(message.timestamp).toLocaleTimeString()}
            </Badge>
          </div>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </CardContent>
      </Card>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

// components/chat/chat-input.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  loading = false,
  placeholder = "Type your message...",
  className,
}: ChatInputProps) {
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (value.trim() && !loading) {
      onSend(value.trim());
    }
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder={placeholder}
        className="min-h-[60px] resize-none"
        disabled={loading}
      />
      <Button
        onClick={handleSend}
        disabled={!value.trim() || loading}
        size="icon"
        className="h-[60px] w-[60px]"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

// components/chat/typing-indicator.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <Avatar className="h-8 w-8">
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <Card className="bg-muted">
        <CardContent className="p-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

#### 7.7.2 Layout Structure

```typescript
// Main application layout
const AppLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

// Header component with user info and navigation
const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Podio AI Chat</h1>
        </div>

        <div className="flex items-center space-x-4">
          <UserMenu user={user} onSignOut={signOut} />
        </div>
      </div>
    </header>
  );
};

// Sidebar with recent chats
const Sidebar: React.FC = () => {
  const { recentChats } = useChats();

  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Chats
          </h2>
          <div className="space-y-2">
            {recentChats.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} />
            ))}
          </div>
        </div>

        <NewChatButton />
      </div>
    </aside>
  );
};
````

#### 7.7.3 Dashboard Components

```typescript
// Main dashboard page
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { recentChats } = useChats();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Ask questions about your Podio data using natural language.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <QuickStartCard />
        <RecentActivityCard />
      </div>

      <RecentChatsList chats={recentChats} />
    </div>
  );
};

// Quick start card for new chat
const QuickStartCard: React.FC = () => {
  const [itemId, setItemId] = useState("");
  const router = useRouter();

  const handleStartChat = () => {
    if (itemId.trim()) {
      router.push(`/chat/${itemId}`);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Start New Chat</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Podio Item ID
          </label>
          <input
            type="number"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Enter item ID (e.g., 12345)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleStartChat}
          disabled={!itemId.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Chat
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-3">
        You must have access to the item in Podio to start a chat.
      </p>
    </div>
  );
};

// Recent activity card
const RecentActivityCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Recent Activity
      </h3>

      <div className="space-y-3">
        <ActivityItem
          type="chat"
          title="Project Alpha Discussion"
          time="2 hours ago"
          itemId="12345"
        />
        <ActivityItem
          type="summary"
          title="Task Report Analysis"
          time="1 day ago"
          itemId="67890"
        />
      </div>
    </div>
  );
};
```

#### 7.7.4 Chat Interface Components

```typescript
// Main chat interface
const ChatInterface: React.FC<{ itemId: string }> = ({ itemId }) => {
  const { messages, sendMessage, loading } = useChat(itemId);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && !loading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader itemId={itemId} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {loading && <TypingIndicator />}
        </div>
      </div>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
};

// Chat header with item info
const ChatHeader: React.FC<{ itemId: string }> = ({ itemId }) => {
  const { itemInfo } = useItemInfo(itemId);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Item #{itemId}
            </h2>
            {itemInfo && (
              <p className="text-sm text-gray-500">{itemInfo.title}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <ExportIcon className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Message bubble component
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl px-4 py-3 rounded-lg ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="flex items-start space-x-3">
          {!isUser && (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AI</span>
            </div>
          )}

          <div className="flex-1">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>

            <div
              className={`text-xs mt-2 ${
                isUser ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat input component
const ChatInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
}> = ({ value, onChange, onSend, loading }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about this item..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              disabled={loading}
            />
          </div>

          <button
            onClick={onSend}
            disabled={!value.trim() || loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Spinner className="w-5 h-5" />
            ) : (
              <SendIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </div>

          <div className="text-xs text-gray-500">
            {value.length}/1000 characters
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### 7.7.5 Loading and Error States

```typescript
// Loading indicator component
const LoadingIndicator: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center space-x-3">
        <Spinner className="w-5 h-5 text-blue-600" />
        <span className="text-gray-600">{message}</span>
      </div>
    </div>
  );
};

// Progress bar for large data loading
const ProgressBar: React.FC<{ progress: number; label: string }> = ({
  progress,
  label,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Error message component
const ErrorMessage: React.FC<{
  error: string;
  onRetry?: () => void;
}> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <ExclamationIcon className="w-5 h-5 text-red-400 mt-0.5" />

        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Something went wrong
          </h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm text-red-800 hover:text-red-900 font-medium"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```

#### 7.7.6 Data Visualization Components

```typescript
// Data summary card
const DataSummaryCard: React.FC<{
  title: string;
  data: any;
  type: "comments" | "files" | "fields";
}> = ({ title, data, type }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-lg font-semibold text-gray-900">
            {data.total || data.length}
          </span>
        </div>

        {type === "comments" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Recent</span>
              <span className="text-gray-900">{data.recent?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Authors</span>
              <span className="text-gray-900">{data.authors?.length || 0}</span>
            </div>
          </div>
        )}

        {type === "files" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Size</span>
              <span className="text-gray-900">
                {formatFileSize(data.totalSize)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Types</span>
              <span className="text-gray-900">
                {data.fileTypes?.length || 0}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Comment list component
const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {comment.author?.charAt(0)}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// File list component
const FileList: React.FC<{ files: File[] }> = ({ files }) => {
  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
        >
          <FileIcon className="w-5 h-5 text-gray-400" />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {file.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>{file.type}</span>
              <span>{new Date(file.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <button className="text-blue-600 hover:text-blue-700">
            <DownloadIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
```

#### 7.7.7 Responsive Design Considerations

```typescript
// Responsive breakpoints and mobile considerations
const responsiveConfig = {
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  mobile: {
    sidebar: "hidden", // Hide sidebar on mobile
    chatInput: "full-width", // Full width input on mobile
    messageBubbles: "compact", // Compact message bubbles
  },
};

// Mobile-optimized chat interface
const MobileChatInterface: React.FC<{ itemId: string }> = ({ itemId }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSidebar(true)}
            className="text-gray-600"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          <h1 className="text-lg font-medium text-gray-900">Item #{itemId}</h1>

          <button className="text-gray-600">
            <MoreIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {showSidebar && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute left-0 top-0 h-full w-80 bg-white">
            <Sidebar onClose={() => setShowSidebar(false)} />
          </div>
        </div>
      )}

      {/* Chat content */}
      <div className="flex-1 overflow-y-auto">
        <ChatMessages itemId={itemId} />
      </div>

      {/* Mobile chat input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <MobileChatInput itemId={itemId} />
      </div>
    </div>
  );
};
```

#### 7.7.8 Accessibility Features

```typescript
// Accessibility considerations
const accessibilityFeatures = {
  // Keyboard navigation
  keyboardShortcuts: {
    Enter: "Send message",
    "Shift+Enter": "New line",
    Escape: "Close modal/sidebar",
    "Ctrl+K": "Focus search",
  },

  // Screen reader support
  ariaLabels: {
    sendButton: "Send message",
    loadingIndicator: "Loading content",
    errorMessage: "Error occurred",
    progressBar: "Loading progress",
  },

  // Focus management
  focusManagement: {
    autoFocus: "chat-input",
    trapFocus: "modals",
    restoreFocus: "after-modal-close",
  },
};

// Accessible button component
const AccessibleButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}> = ({ children, onClick, disabled, ariaLabel, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};
```

#### 7.5.6 Gemini AI Integration with MCP

```typescript
// MCP integration with Gemini AI
interface PodioMCPTools {
  "podio:get_item_details": {
    description: "Get complete details of a specific Podio item";
    parameters: { item_id: number };
  };
  "podio:get_comments": {
    description: "Get all comments and activity for an item";
    parameters: { item_id: number; limit?: number; offset?: number };
  };
  // ... other tools
}

// Function to process chat with MCP and Gemini AI
async function processChatWithMCPAndGemini(
  userQuery: string,
  itemId: number
): Promise<string> {
  // 1. Analyze query with Gemini AI
  const analysis = await analyzeQueryWithGemini(userQuery);

  // 2. Call relevant MCP tools
  const podioData = {};
  const requiredTools = determineRequiredTools(analysis);

  for (const tool of requiredTools) {
    try {
      const result = await mcp.call(tool, { item_id: itemId });
      podioData[tool] = result;
    } catch (error) {
      console.error(`MCP tool ${tool} failed:`, error);
      podioData[tool] = { error: error.message };
    }
  }

  // 3. Generate response with Gemini AI
  const response = await generateResponseWithGemini(userQuery, podioData, []);

  return response;
}
```

### 7.6 Large Data Handling Strategies

#### 7.6.1 Data Size Thresholds and Limits

```typescript
// Data size thresholds for different operations
const DATA_LIMITS = {
  COMMENTS_PER_REQUEST: 50,
  FILES_PER_REQUEST: 20,
  MAX_ITEM_FIELDS: 100,
  MAX_TOKEN_LIMIT: 6000, // Gemini Flash token limit
  MAX_RESPONSE_TIME: 10000, // 10 seconds
  CACHE_EXPIRY: 3600, // 1 hour
  COMPRESSION_THRESHOLD: 10000, // 10KB
} as const;

// Data size categories
enum DataSize {
  SMALL = "small", // < 1KB
  MEDIUM = "medium", // 1KB - 10KB
  LARGE = "large", // 10KB - 100KB
  HUGE = "huge", // > 100KB
}
```

#### 7.6.2 Pagination and Chunking Implementation

```typescript
// Pagination for large comment datasets
async function getCommentsWithPagination(
  itemId: number,
  page: number = 1,
  limit: number = DATA_LIMITS.COMMENTS_PER_REQUEST
): Promise<PaginatedComments> {
  const offset = (page - 1) * limit;

  try {
    const comments = await mcp.call("podio:get_comments", {
      item_id: itemId,
      limit,
      offset,
    });

    return {
      comments: comments.data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(comments.total / limit),
        totalItems: comments.total,
        hasNext: page * limit < comments.total,
        hasPrevious: page > 1,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }
}

// Data chunking for large item details
function chunkLargeData(data: any, chunkSize: number = 1000): any[] {
  const chunks = [];
  const dataString = JSON.stringify(data);

  for (let i = 0; i < dataString.length; i += chunkSize) {
    chunks.push(dataString.slice(i, i + chunkSize));
  }

  return chunks;
}
```

#### 7.6.3 Intelligent Data Summarization

```typescript
// Function to summarize large datasets when they exceed token limits
async function summarizeLargeDataset(
  data: any,
  dataType: "comments" | "files" | "fields"
): Promise<string> {
  const dataSize = JSON.stringify(data).length;

  if (dataSize < DATA_LIMITS.MAX_TOKEN_LIMIT) {
    return JSON.stringify(data);
  }

  // Create summary based on data type
  let summaryPrompt = "";

  switch (dataType) {
    case "comments":
      summaryPrompt = `
You have access to ${data.length} comments for a Podio item. 
Due to size limitations, please provide a comprehensive summary including:
- Total number of comments
- Most recent comments (last 5)
- Key themes or topics discussed
- Most active commenters
- Overall sentiment (positive/negative/neutral)

Comments data: ${JSON.stringify(data.slice(0, 20))} // First 20 for context
      `;
      break;

    case "files":
      summaryPrompt = `
You have access to ${data.length} files for a Podio item.
Please provide a summary including:
- Total number of files
- File types breakdown
- Total size
- Most recent files
- Largest files

Files data: ${JSON.stringify(data.slice(0, 10))} // First 10 for context
      `;
      break;

    case "fields":
      summaryPrompt = `
You have access to ${Object.keys(data).length} fields for a Podio item.
Please provide a summary including:
- Key field values
- Important status information
- Dates and deadlines
- Numerical data summary
- Relationships and references

Fields data: ${JSON.stringify(data)}
      `;
      break;
  }

  return await safeGeminiCall(summaryPrompt);
}
```

#### 7.6.4 Progressive Loading and User Feedback

```typescript
// Progressive loading for large datasets
class ProgressiveDataLoader {
  private loadingStates: Map<string, boolean> = new Map();
  private progressCallbacks: Map<string, (progress: number) => void> =
    new Map();

  async loadCommentsProgressively(
    itemId: number,
    onProgress: (progress: number) => void
  ): Promise<Comment[]> {
    const cacheKey = `comments_${itemId}`;
    this.loadingStates.set(cacheKey, true);
    this.progressCallbacks.set(cacheKey, onProgress);

    try {
      // First, try to get cached data
      const cached = await getCachedData(cacheKey);
      if (cached) {
        onProgress(100);
        return cached;
      }

      // Load data progressively
      const allComments = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        onProgress((page - 1) * 20); // 20% per page

        const result = await getCommentsWithPagination(itemId, page, 20);
        allComments.push(...result.comments);

        hasMore = result.pagination.hasNext;
        page++;

        // Add delay to prevent overwhelming the API
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Cache the result
      await cacheData(cacheKey, allComments);
      onProgress(100);

      return allComments;
    } finally {
      this.loadingStates.set(cacheKey, false);
      this.progressCallbacks.delete(cacheKey);
    }
  }

  isLoading(key: string): boolean {
    return this.loadingStates.get(key) || false;
  }
}
```

#### 7.6.5 Smart Caching for Large Data

```typescript
// Enhanced caching with size-based strategies
class SmartCache {
  private cache = new Map<
    string,
    { data: any; timestamp: number; size: number }
  >();
  private maxCacheSize = 50 * 1024 * 1024; // 50MB
  private currentSize = 0;

  async set(key: string, data: any, ttl: number = 3600): Promise<void> {
    const dataSize = JSON.stringify(data).length;

    // Check if adding this data would exceed cache limit
    if (this.currentSize + dataSize > this.maxCacheSize) {
      await this.evictOldEntries();
    }

    // For large data, compress before storing
    let processedData = data;
    if (dataSize > DATA_LIMITS.COMPRESSION_THRESHOLD) {
      processedData = await this.compressData(data);
    }

    this.cache.set(key, {
      data: processedData,
      timestamp: Date.now(),
      size: dataSize,
    });

    this.currentSize += dataSize;
  }

  async get(key: string): Promise<any | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > 3600 * 1000) {
      this.cache.delete(key);
      this.currentSize -= entry.size;
      return null;
    }

    // Decompress if needed
    if (entry.data.compressed) {
      return await this.decompressData(entry.data);
    }

    return entry.data;
  }

  private async compressData(data: any): Promise<any> {
    // Implement compression logic (e.g., using zlib)
    return { compressed: true, data: JSON.stringify(data) };
  }

  private async decompressData(compressedData: any): Promise<any> {
    // Implement decompression logic
    return JSON.parse(compressedData.data);
  }

  private async evictOldEntries(): Promise<void> {
    const entries = Array.from(this.cache.entries()).sort(
      (a, b) => a[1].timestamp - b[1].timestamp
    );

    // Remove oldest 20% of entries
    const toRemove = Math.ceil(entries.length * 0.2);

    for (let i = 0; i < toRemove; i++) {
      const [key, entry] = entries[i];
      this.cache.delete(key);
      this.currentSize -= entry.size;
    }
  }
}
```

#### 7.6.6 Timeout and Error Handling for Large Data

```typescript
// Enhanced error handling for large data operations
class LargeDataHandler {
  private timeouts = new Map<string, NodeJS.Timeout>();

  async handleLargeDataRequest<T>(
    operation: () => Promise<T>,
    operationKey: string,
    timeoutMs: number = DATA_LIMITS.MAX_RESPONSE_TIME
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      // Set timeout
      const timeout = setTimeout(() => {
        reject(
          new Error(`Operation ${operationKey} timed out after ${timeoutMs}ms`)
        );
      }, timeoutMs);

      this.timeouts.set(operationKey, timeout);

      // Execute operation
      operation()
        .then((result) => {
          clearTimeout(timeout);
          this.timeouts.delete(operationKey);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeout);
          this.timeouts.delete(operationKey);
          reject(error);
        });
    });
  }

  async processLargeComments(
    itemId: number,
    onProgress: (progress: number) => void
  ): Promise<CommentSummary> {
    return this.handleLargeDataRequest(async () => {
      const loader = new ProgressiveDataLoader();
      const comments = await loader.loadCommentsProgressively(
        itemId,
        onProgress
      );

      // If comments are too large, summarize them
      if (comments.length > 100) {
        const summary = await summarizeLargeDataset(comments, "comments");
        return {
          type: "summary",
          totalComments: comments.length,
          summary,
          recentComments: comments.slice(-5),
        };
      }

      return {
        type: "full",
        comments,
        totalComments: comments.length,
      };
    }, `comments_${itemId}`);
  }
}
```

#### 7.6.7 User Interface for Large Data Handling

```typescript
// React components for handling large data in UI
interface LargeDataProps {
  itemId: number;
  dataType: "comments" | "files" | "fields";
}

const LargeDataHandler: React.FC<LargeDataProps> = ({ itemId, dataType }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      const handler = new LargeDataHandler();
      const result = await handler.processLargeComments(itemId, setProgress);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="large-data-handler">
      {loading && (
        <div className="loading-indicator">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p>
            Loading {dataType}... {progress}%
          </p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={loadData}>Retry</button>
        </div>
      )}

      {data && (
        <div className="data-display">
          {data.type === "summary" ? (
            <div className="summary-view">
              <h3>Summary ({data.totalComments} total)</h3>
              <div className="summary-content">{data.summary}</div>
              <button onClick={loadData}>Load Full Data</button>
            </div>
          ) : (
            <div className="full-view">{/* Render full data */}</div>
          )}
        </div>
      )}
    </div>
  );
};
```

#### 7.6.8 Data Filtering and Search

```typescript
// Data filtering to reduce dataset size
interface DataFilter {
  dateRange?: { start: Date; end: Date };
  author?: string;
  type?: string;
  size?: { min: number; max: number };
  search?: string;
}

async function getFilteredData(
  itemId: number,
  filter: DataFilter,
  dataType: "comments" | "files"
): Promise<any> {
  // Build filter parameters for MCP call
  const filterParams: any = { item_id: itemId };

  if (filter.dateRange) {
    filterParams.created_from = filter.dateRange.start.toISOString();
    filterParams.created_to = filter.dateRange.end.toISOString();
  }

  if (filter.author) {
    filterParams.author = filter.author;
  }

  if (filter.search) {
    filterParams.search = filter.search;
  }

  // Call MCP with filters
  const result = await mcp.call(`podio:get_${dataType}`, filterParams);

  return result;
}
```

#### 7.6.9 Background Processing for Large Operations

```typescript
// Background processing for large data operations
class BackgroundProcessor {
  private queue: Array<{ id: string; operation: () => Promise<any> }> = [];
  private processing = false;

  async addToQueue(
    operation: () => Promise<any>,
    operationId: string
  ): Promise<string> {
    this.queue.push({ id: operationId, operation });

    if (!this.processing) {
      this.processQueue();
    }

    return operationId;
  }

  private async processQueue(): Promise<void> {
    this.processing = true;

    while (this.queue.length > 0) {
      const { operation, id } = this.queue.shift()!;

      try {
        await operation();
        console.log(`Background operation ${id} completed`);
      } catch (error) {
        console.error(`Background operation ${id} failed:`, error);
      }
    }

    this.processing = false;
  }
}

// Usage example
const backgroundProcessor = new BackgroundProcessor();

// For large data operations
backgroundProcessor.addToQueue(async () => {
  const handler = new LargeDataHandler();
  await handler.processLargeComments(itemId, () => {});
}, `process_comments_${itemId}`);
```

### 7.8 Supabase Authentication and Real-time Features

#### 7.8.1 Supabase Auth with Podio OAuth Integration

```typescript
// lib/supabase/auth.ts
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client-side client
export const createClientSupabase = () => createClientComponentClient();

// Podio OAuth configuration
export const podioAuthConfig = {
  provider: "podio",
  clientId: process.env.NEXT_PUBLIC_PODIO_CLIENT_ID!,
  clientSecret: process.env.PODIO_CLIENT_SECRET!,
  redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
  scopes: ["read", "write"],
};

// Custom Podio OAuth handler
export async function signInWithPodio() {
  const supabase = createClientSupabase();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "podio",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw new Error(`Podio OAuth error: ${error.message}`);
  }

  return data;
}

// Auth callback handler
export async function handleAuthCallback(code: string) {
  const supabase = createClientSupabase();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw new Error(`Auth callback error: ${error.message}`);
  }

  // Sync user profile with Podio data
  if (data.user) {
    await syncUserProfile(data.user);
  }

  return data;
}

// Sync user profile from Podio
async function syncUserProfile(user: any) {
  const supabase = createClientSupabase();

  // Get Podio user info
  const podioUser = await getPodioUserInfo(user.access_token);

  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      podio_user_id: podioUser.user_id,
      email: podioUser.mail,
      name: podioUser.name,
      avatar_url: podioUser.avatar,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "id",
    }
  );

  if (error) {
    console.error("Error syncing user profile:", error);
  }
}

// Custom auth hook
export function useAuth() {
  const supabase = createClientSupabase();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    loading,
    signOut,
    signInWithPodio,
  };
}
```

#### 7.8.2 Supabase Real-time Chat Implementation

```typescript
// lib/supabase/realtime.ts
import { createClientSupabase } from "./auth";
import { RealtimeChannel } from "@supabase/supabase-js";

export class ChatRealtimeManager {
  private supabase = createClientSupabase();
  private channels: Map<string, RealtimeChannel> = new Map();

  // Subscribe to chat messages
  subscribeToChat(sessionId: string, onMessage: (message: any) => void) {
    const channel = this.supabase
      .channel(`chat:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          onMessage(payload.new);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          onMessage(payload.new);
        }
      )
      .subscribe();

    this.channels.set(sessionId, channel);
    return channel;
  }

  // Subscribe to typing indicators
  subscribeToTyping(sessionId: string, onTyping: (data: any) => void) {
    const channel = this.supabase
      .channel(`typing:${sessionId}`)
      .on("broadcast", { event: "typing" }, (payload) => {
        onTyping(payload.payload);
      })
      .subscribe();

    this.channels.set(`typing:${sessionId}`, channel);
    return channel;
  }

  // Send typing indicator
  sendTypingIndicator(sessionId: string, userId: string, isTyping: boolean) {
    const channel = this.channels.get(`typing:${sessionId}`);
    if (channel) {
      channel.send({
        type: "broadcast",
        event: "typing",
        payload: {
          userId,
          isTyping,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  // Unsubscribe from channel
  unsubscribe(sessionId: string) {
    const channel = this.channels.get(sessionId);
    if (channel) {
      this.supabase.removeChannel(channel);
      this.channels.delete(sessionId);
    }
  }

  // Unsubscribe from all channels
  unsubscribeAll() {
    this.channels.forEach((channel) => {
      this.supabase.removeChannel(channel);
    });
    this.channels.clear();
  }
}

// Real-time chat hook
export function useRealtimeChat(sessionId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [realtimeManager] = useState(() => new ChatRealtimeManager());

  useEffect(() => {
    if (!sessionId) return;

    // Subscribe to messages
    const messageChannel = realtimeManager.subscribeToChat(
      sessionId,
      (message) => {
        setMessages((prev) => [...prev, message]);
      }
    );

    // Subscribe to typing indicators
    const typingChannel = realtimeManager.subscribeToTyping(
      sessionId,
      (data) => {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          if (data.isTyping) {
            newSet.add(data.userId);
          } else {
            newSet.delete(data.userId);
          }
          return newSet;
        });
      }
    );

    return () => {
      realtimeManager.unsubscribe(sessionId);
    };
  }, [sessionId]);

  const sendTypingIndicator = useCallback(
    (isTyping: boolean) => {
      realtimeManager.sendTypingIndicator(sessionId, "current-user", isTyping);
    },
    [sessionId, realtimeManager]
  );

  return {
    messages,
    typingUsers,
    sendTypingIndicator,
  };
}
```

#### 7.8.3 Enhanced Chat Interface with Real-time Features

```typescript
// components/chat/enhanced-chat-interface.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";
import { useRealtimeChat } from "@/lib/supabase/realtime";
import { useAuth } from "@/lib/supabase/auth";
import { cn } from "@/lib/utils";

interface EnhancedChatInterfaceProps {
  sessionId: string;
  itemId: string;
  className?: string;
}

export function EnhancedChatInterface({
  sessionId,
  itemId,
  className,
}: EnhancedChatInterfaceProps) {
  const { user } = useAuth();
  const { messages, typingUsers, sendTypingIndicator } =
    useRealtimeChat(sessionId);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debounced typing indicator
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isTyping) {
        sendTypingIndicator(false);
        setIsTyping(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isTyping, sendTypingIndicator]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);

      if (!isTyping) {
        setIsTyping(true);
        sendTypingIndicator(true);
      }
    },
    [isTyping, sendTypingIndicator]
  );

  const handleSend = async (message: string) => {
    if (message.trim() && !loading) {
      setLoading(true);
      sendTypingIndicator(false);
      setIsTyping(false);

      try {
        const response = await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            itemId,
            message: message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        setInputValue("");
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className={cn("flex flex-col h-[600px]", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/podio-icon.png" alt="Podio" />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Item #{itemId}</h2>
            <p className="text-sm text-muted-foreground">
              Real-time chat with AI assistant
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Live</Badge>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.user_id === user?.id}
            />
          ))}
          {loading && <TypingIndicator />}
          {typingUsers.size > 0 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <span>
                {typingUsers.size} user{typingUsers.size > 1 ? "s" : ""}{" "}
                typing...
              </span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <ChatInput
          value={inputValue}
          onChange={handleInputChange}
          onSend={handleSend}
          loading={loading}
          placeholder="Ask a question about this item..."
        />
      </div>
    </Card>
  );
}
```

#### 7.8.4 Supabase Database Triggers for Real-time

```sql
-- Enable real-time for messages table
ALTER TABLE messages REPLICA IDENTITY FULL;

-- Create function to notify on message insert
CREATE OR REPLACE FUNCTION notify_message_insert()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'chat:' || NEW.session_id,
    json_build_object(
      'type', 'INSERT',
      'message', row_to_json(NEW)
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for message insert
CREATE TRIGGER messages_insert_trigger
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_message_insert();

-- Create function to notify on message update
CREATE OR REPLACE FUNCTION notify_message_update()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'chat:' || NEW.session_id,
    json_build_object(
      'type', 'UPDATE',
      'message', row_to_json(NEW)
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for message update
CREATE TRIGGER messages_update_trigger
  AFTER UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_message_update();

-- Create function to update message count
CREATE OR REPLACE FUNCTION update_chat_session_message_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chat_sessions
  SET message_count = (
    SELECT COUNT(*)
    FROM messages
    WHERE session_id = NEW.session_id
  ),
  updated_at = NOW()
  WHERE id = NEW.session_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for message count update
CREATE TRIGGER update_message_count_trigger
  AFTER INSERT OR DELETE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_session_message_count();
```

#### 7.8.5 Real-time Presence and User Status

```typescript
// lib/supabase/presence.ts
import { createClientSupabase } from "./auth";

export class PresenceManager {
  private supabase = createClientSupabase();
  private presenceChannel: any = null;

  // Track user presence in chat session
  trackPresence(sessionId: string, userId: string, userData: any) {
    this.presenceChannel = this.supabase
      .channel(`presence:${sessionId}`, {
        config: {
          presence: {
            key: userId,
          },
        },
      })
      .on("presence", { event: "sync" }, () => {
        const state = this.presenceChannel.presenceState();
        console.log("Presence state:", state);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("User joined:", key, newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("User left:", key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await this.presenceChannel.track({
            user_id: userId,
            user_name: userData.name,
            user_avatar: userData.avatar_url,
            online_at: new Date().toISOString(),
          });
        }
      });

    return this.presenceChannel;
  }

  // Get online users in session
  getOnlineUsers(sessionId: string) {
    if (!this.presenceChannel) return [];

    const state = this.presenceChannel.presenceState();
    return Object.values(state).flat();
  }

  // Leave presence
  leavePresence() {
    if (this.presenceChannel) {
      this.supabase.removeChannel(this.presenceChannel);
      this.presenceChannel = null;
    }
  }
}

// Presence hook
export function usePresence(sessionId: string, user: any) {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [presenceManager] = useState(() => new PresenceManager());

  useEffect(() => {
    if (!sessionId || !user) return;

    const channel = presenceManager.trackPresence(sessionId, user.id, {
      name: user.name,
      avatar_url: user.avatar_url,
    });

    const interval = setInterval(() => {
      const users = presenceManager.getOnlineUsers(sessionId);
      setOnlineUsers(users);
    }, 5000);

    return () => {
      clearInterval(interval);
      presenceManager.leavePresence();
    };
  }, [sessionId, user]);

  return { onlineUsers };
}
```

#### 7.8.6 Environment Configuration for Supabase Auth

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Podio OAuth Configuration
NEXT_PUBLIC_PODIO_CLIENT_ID=your_podio_client_id
PODIO_CLIENT_SECRET=your_podio_client_secret
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Gemini AI Configuration
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=0.7

# Application Configuration
NODE_ENV=production
```

#### 7.8.7 Supabase Auth Middleware

```typescript
// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session and trying to access protected route
  if (!session && req.nextUrl.pathname.startsWith("/chat")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If session exists and trying to access auth pages
  if (session && req.nextUrl.pathname.startsWith("/auth")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/chat/:path*", "/dashboard/:path*", "/auth/:path*"],
};
```

#### 7.8.8 Benefits of Using Supabase Auth and Real-time

**Authentication Benefits:**

- **Built-in OAuth**: Native support for OAuth providers
- **Session Management**: Automatic session handling
- **Security**: Enterprise-grade security features
- **User Management**: Complete user lifecycle management
- **Row Level Security**: Fine-grained access control

**Real-time Benefits:**

- **Live Chat**: Instant message delivery
- **Typing Indicators**: Real-time user activity
- **Presence**: Show who's online
- **Performance**: Optimized for real-time updates
- **Scalability**: Handles thousands of concurrent connections

**Development Benefits:**

- **Reduced Complexity**: No need for WebSocket management
- **Built-in Features**: Authentication, real-time, database in one platform
- **Type Safety**: Full TypeScript support
- **Developer Experience**: Excellent tooling and documentation
- **Cost Effective**: Pay only for what you use

## 8. Implementation Phases

### 8.1 Phase 1: Foundation (Weeks 1-2)

- Set up Next.js project with TypeScript and Tailwind CSS
- Implement Podio OAuth authentication
- Create basic dashboard layout
- Set up database and basic schemas
- Implement basic chat interface

### 8.2 Phase 2: Core Functionality (Weeks 3-4)

- Implement MCP server for Podio integration
- Create basic MCP tools (get_item_basic, validate_access)
- Implement AI query analysis
- Build chat message handling
- Add basic error handling

### 8.3 Phase 3: Advanced Features (Weeks 5-6)

- Implement all MCP tools
- Add comprehensive AI integration
- Build chat history and session management
- Implement data caching
- Add performance optimizations

### 8.4 Phase 4: Polish & Testing (Weeks 7-8)

- Add comprehensive error handling
- Implement security measures
- Add monitoring and logging
- Performance testing and optimization
- User acceptance testing

## 9. Risk Assessment

### 9.1 Technical Risks

- **Podio API Rate Limits**: Mitigation through caching and request optimization
- **AI Response Quality**: Mitigation through prompt engineering and fallback responses
- **Data Security**: Mitigation through encryption and secure token handling
- **Performance Issues**: Mitigation through optimization and caching

### 9.2 Business Risks

- **User Adoption**: Mitigation through intuitive UI and clear value proposition
- **Podio Policy Changes**: Mitigation through flexible architecture
- **Competition**: Mitigation through unique AI-driven approach

## 10. Success Criteria

### 10.1 Technical Success Criteria

- All functional requirements implemented and tested
- Performance benchmarks met
- Security requirements satisfied
- Zero critical security vulnerabilities

### 10.2 Business Success Criteria

- Successful user testing with target audience
- Positive user feedback and satisfaction scores
- Reduced time spent on Podio data analysis
- Increased user engagement with Podio data

## 11. Future Enhancements

### 11.1 Advanced AI Features

- Multi-item queries across related items
- Predictive analytics and insights
- Natural language data visualization
- Automated report generation

### 11.2 Collaboration Features

- Share chat sessions with team members
- Collaborative item analysis
- Team chat rooms for specific items
- Export chat results to various formats

### 11.3 Integration Enhancements

- Support for other project management tools
- Mobile application development
- API for third-party integrations
- Advanced analytics dashboard

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Prepared By**: Development Team  
**Approved By**: Product Manager
