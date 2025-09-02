"use client";

import React, { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { RotateCcwIcon } from "lucide-react";
import {
  Conversation,
  ConversationContent,
} from "@/components/ui/shadcn-io/ai/conversation";
import { Loader } from "@/components/ui/shadcn-io/ai/loader";
import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ui/shadcn-io/ai/reasoning";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  reasoning?: string;
  sources?: Array<{ title: string; url: string }>;
  isStreaming?: boolean;
}

const models = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
  { id: "llama-3.1-70b", name: "Llama 3.1 70B" },
];

const sampleResponses = [
  {
    content:
      "I'd be happy to help you with that! React is a powerful JavaScript library for building user interfaces. What specific aspect would you like to explore?",
    reasoning:
      "The user is asking about React, which is a broad topic. I should provide a helpful overview while asking for more specific information to give a more targeted response.",
    sources: [
      { title: "React Official Documentation", url: "https://react.dev" },
      { title: "React Developer Tools", url: "https://react.dev/learn" },
    ],
  },
  {
    content:
      "Next.js is an excellent framework built on top of React that provides server-side rendering, static site generation, and many other powerful features out of the box.",
    reasoning:
      "The user mentioned Next.js, so I should explain its relationship to React and highlight its key benefits for modern web development.",
    sources: [
      { title: "Next.js Documentation", url: "https://nextjs.org/docs" },
      {
        title: "Vercel Next.js Guide",
        url: "https://vercel.com/guides/nextjs",
      },
    ],
  },
  {
    content:
      "TypeScript adds static type checking to JavaScript, which helps catch errors early and improves code quality. It's particularly valuable in larger applications.",
    reasoning:
      "TypeScript is becoming increasingly important in modern development. I should explain its benefits while keeping the explanation accessible.",
    sources: [
      {
        title: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs",
      },
      {
        title: "TypeScript with React",
        url: "https://react.dev/learn/typescript",
      },
    ],
  },
];

interface AIChatbotProps {
  messages?: ChatMessage[];
  onMessageSend?: (message: string) => void;
  isStreaming?: boolean;
  selectedModel?: string;
  onModelChange?: (model: string) => void;
  className?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  messages: externalMessages,
  onMessageSend,
  isStreaming: externalIsStreaming,
  selectedModel: externalSelectedModel,
  onModelChange,
  className,
  ...props
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nanoid(),
      content:
        "Hello! I'm your AI assistant. I can help you with coding questions, explain concepts, and provide guidance on web development topics. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
      sources: [
        { title: "Getting Started Guide", url: "#" },
        { title: "API Documentation", url: "#" },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [isTyping, setIsTyping] = useState(false);

  // Use external state if provided
  const finalMessages = externalMessages || messages;
  const finalIsStreaming =
    externalIsStreaming !== undefined ? externalIsStreaming : isTyping;
  const finalSelectedModel = externalSelectedModel || selectedModel;

  const simulateTyping = useCallback(
    (
      messageId: string,
      content: string,
      reasoning?: string,
      sources?: Array<{ title: string; url: string }>
    ) => {
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              const currentContent = content.slice(0, currentIndex);
              return {
                ...msg,
                content: currentContent,
                isStreaming: currentIndex < content.length,
                reasoning:
                  currentIndex >= content.length ? reasoning : undefined,
                sources: currentIndex >= content.length ? sources : undefined,
              };
            }
            return msg;
          })
        );
        currentIndex += Math.random() > 0.1 ? 1 : 0; // Simulate variable typing speed

        if (currentIndex >= content.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(typeInterval);
    },
    []
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (!inputValue.trim() || finalIsStreaming) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: nanoid(),
        content: inputValue.trim(),
        role: "user",
        timestamp: new Date(),
      };

      if (onMessageSend) {
        onMessageSend(inputValue.trim());
      } else {
        setMessages((prev) => [...prev, userMessage]);
      }

      setInputValue("");
      setIsTyping(true);

      // Simulate AI response with delay
      setTimeout(() => {
        const responseData =
          sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        const assistantMessageId = nanoid();

        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          content: "",
          role: "assistant",
          timestamp: new Date(),
          isStreaming: true,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Start typing simulation
        simulateTyping(
          assistantMessageId,
          responseData.content,
          responseData.reasoning,
          responseData.sources
        );
      }, 800);
    },
    [inputValue, finalIsStreaming, simulateTyping, onMessageSend]
  );

  const handleReset = useCallback(() => {
    setMessages([
      {
        id: nanoid(),
        content:
          "Hello! I'm your AI assistant. I can help you with coding questions, explain concepts, and provide guidance on web development topics. What would you like to know?",
        role: "assistant",
        timestamp: new Date(),
        sources: [
          { title: "Getting Started Guide", url: "#" },
          { title: "API Documentation", url: "#" },
        ],
      },
    ]);
    setInputValue("");
    setIsTyping(false);
  }, []);

  const handleModelChange = useCallback(
    (modelId: string) => {
      if (onModelChange) {
        onModelChange(modelId);
      } else {
        setSelectedModel(modelId);
      }
    },
    [onModelChange]
  );

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden ${className}`}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500" />
            <span className="font-medium text-sm">AI Assistant</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-muted-foreground text-xs">
            {models.find((m) => m.id === finalSelectedModel)?.name}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-8 px-2"
        >
          <RotateCcwIcon className="size-4" />
          <span className="ml-1">Reset</span>
        </Button>
      </div>

      {/* Conversation Area */}
      <Conversation className="flex-1">
        <ConversationContent className="space-y-4">
          {finalMessages.map((message) => (
            <div key={message.id} className="space-y-2">
              <Message from={message.role}>
                <MessageContent>
                  {message.content}
                  {message.isStreaming && <Loader size="sm" className="ml-2" />}
                </MessageContent>
              </Message>

              {/* Reasoning Section */}
              {message.reasoning && (
                <Reasoning>
                  <ReasoningTrigger />
                  <ReasoningContent>{message.reasoning}</ReasoningContent>
                </Reasoning>
              )}
            </div>
          ))}
        </ConversationContent>
      </Conversation>

      {/* Input Area */}
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputTextarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          disabled={finalIsStreaming}
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputButton>
              <RotateCcwIcon className="h-4 w-4" />
            </PromptInputButton>
          </PromptInputTools>

          <PromptInputModelSelect>
            <Select
              value={finalSelectedModel}
              onValueChange={handleModelChange}
            >
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue>
                  {models.find((m) => m.id === finalSelectedModel)?.name}
                </PromptInputModelSelectValue>
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {models.map((model) => (
                  <PromptInputModelSelectItem key={model.id} value={model.id}>
                    {model.name}
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </Select>
          </PromptInputModelSelect>

          <PromptInputSubmit
            disabled={!inputValue.trim() || finalIsStreaming}
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};
