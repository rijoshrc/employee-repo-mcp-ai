"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from: "user" | "assistant";
  children: React.ReactNode;
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, from, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex gap-3",
        from === "user" ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    >
      {from === "assistant" && <MessageAvatar name="AI" />}
      <div
        className={cn(
          "flex flex-col gap-2 max-w-[80%]",
          from === "user" ? "items-end" : "items-start"
        )}
      >
        {children}
      </div>
      {from === "user" && <MessageAvatar name="YOU" />}
    </div>
  )
);
Message.displayName = "Message";

const MessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg px-4 py-2 text-sm", "bg-muted", className)}
    {...props}
  >
    {children}
  </div>
));
MessageContent.displayName = "MessageContent";

interface MessageAvatarProps {
  name?: string;
}

const MessageAvatar = React.forwardRef<HTMLDivElement, MessageAvatarProps>(
  ({ name, ...props }, ref) => (
    <div
      ref={ref}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium"
      {...props}
    >
      {name}
    </div>
  )
);
MessageAvatar.displayName = "MessageAvatar";

export { Message, MessageContent, MessageAvatar };
