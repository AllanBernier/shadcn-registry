import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-h-[80px] min-w-0 px-3 py-2 text-base md:text-sm",
        "-rotate-1 shadow-lg",
        "bg-card text-card-foreground",
        "border-2 border-primary rounded-md",
        "font-bold",
        "placeholder:text-muted-foreground placeholder:font-normal",
        "focus:border-accent focus:ring-accent focus:ring-2 focus:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
