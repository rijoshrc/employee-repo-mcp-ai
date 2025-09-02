"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from "lucide-react";

interface SourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Sources = React.forwardRef<HTMLDivElement, SourcesProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("border-t", className)} {...props}>
      {children}
    </div>
  )
);
Sources.displayName = "Sources";

const SourcesTrigger = React.forwardRef<
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
      <span>Sources</span>
      {isOpen ? (
        <ChevronUpIcon className="h-3 w-3" />
      ) : (
        <ChevronDownIcon className="h-3 w-3" />
      )}
    </Button>
  );
});
SourcesTrigger.displayName = "SourcesTrigger";

const SourcesContent = React.forwardRef<
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
SourcesContent.displayName = "SourcesContent";

interface SourceProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  url: string;
}

const Source = React.forwardRef<HTMLAnchorElement, SourceProps>(
  ({ className, title, url, ...props }, ref) => (
    <a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 text-blue-600 hover:text-blue-800 underline",
        className
      )}
      {...props}
    >
      <ExternalLinkIcon className="h-3 w-3" />
      {title}
    </a>
  )
);
Source.displayName = "Source";

export { Sources, SourcesTrigger, SourcesContent, Source };
