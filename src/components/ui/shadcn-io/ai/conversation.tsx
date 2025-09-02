"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ConversationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Conversation = React.forwardRef<HTMLDivElement, ConversationProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
);
Conversation.displayName = "Conversation";

const ConversationContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-4 py-6", className)}
    {...props}
  />
));
ConversationContent.displayName = "ConversationContent";

const ConversationScrollButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute bottom-4 right-4 rounded-full bg-background border shadow-sm p-2 hover:bg-accent transition-colors",
      className
    )}
    {...props}
  />
));
ConversationScrollButton.displayName = "ConversationScrollButton";

export { Conversation, ConversationContent, ConversationScrollButton };
