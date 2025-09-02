"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface ReasoningProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Reasoning = React.forwardRef<HTMLDivElement, ReasoningProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("border-t", className)} {...props}>
      {children}
    </div>
  )
);
Reasoning.displayName = "Reasoning";

const ReasoningTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "w-full justify-between text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      <span>Reasoning</span>
      {isOpen ? (
        <ChevronUpIcon className="h-3 w-3" />
      ) : (
        <ChevronDownIcon className="h-3 w-3" />
      )}
    </Button>
  );
});
ReasoningTrigger.displayName = "ReasoningTrigger";

const ReasoningContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-4 py-2 text-xs text-muted-foreground bg-muted/50",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ReasoningContent.displayName = "ReasoningContent";

export { Reasoning, ReasoningTrigger, ReasoningContent };
