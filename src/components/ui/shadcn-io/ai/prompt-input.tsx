"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SendIcon } from "lucide-react";

interface PromptInputProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const PromptInput = React.forwardRef<HTMLFormElement, PromptInputProps>(
  ({ className, children, ...props }, ref) => (
    <form
      ref={ref}
      className={cn(
        "flex flex-col gap-4 border-t bg-background p-4",
        className
      )}
      {...props}
    >
      {children}
    </form>
  )
);
PromptInput.displayName = "PromptInput";

const PromptInputTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <Textarea
    ref={ref}
    className={cn("min-h-[60px] resize-none", className)}
    placeholder="Ask me anything..."
    {...props}
  />
));
PromptInputTextarea.displayName = "PromptInputTextarea";

const PromptInputToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between", className)}
    {...props}
  >
    {children}
  </div>
));
PromptInputToolbar.displayName = "PromptInputToolbar";

const PromptInputTools = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
));
PromptInputTools.displayName = "PromptInputTools";

const PromptInputModelSelect = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
));
PromptInputModelSelect.displayName = "PromptInputModelSelect";

const PromptInputModelSelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <SelectTrigger ref={ref} className={cn("w-[140px]", className)} {...props}>
    {children}
  </SelectTrigger>
));
PromptInputModelSelectTrigger.displayName = "PromptInputModelSelectTrigger";

const PromptInputModelSelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectContent>
>(({ className, children, ...props }, ref) => (
  <SelectContent ref={ref} className={cn(className)} {...props}>
    {children}
  </SelectContent>
));
PromptInputModelSelectContent.displayName = "PromptInputModelSelectContent";

const PromptInputModelSelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectItem>
>(({ className, children, ...props }, ref) => (
  <SelectItem ref={ref} className={cn(className)} {...props}>
    {children}
  </SelectItem>
));
PromptInputModelSelectItem.displayName = "PromptInputModelSelectItem";

const PromptInputModelSelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <SelectValue ref={ref} className={cn(className)} {...props}>
    {children}
  </SelectValue>
));
PromptInputModelSelectValue.displayName = "PromptInputModelSelectValue";

const PromptInputSubmit = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, disabled, ...props }, ref) => (
  <Button
    ref={ref}
    type="submit"
    size="sm"
    disabled={disabled}
    className={cn("h-8 w-8 p-0", className)}
    {...props}
  >
    <SendIcon className="h-4 w-4" />
  </Button>
));
PromptInputSubmit.displayName = "PromptInputSubmit";

const PromptInputButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="sm"
    className={cn("h-8 w-8 p-0", className)}
    {...props}
  >
    {children}
  </Button>
));
PromptInputButton.displayName = "PromptInputButton";

export {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputButton,
};
