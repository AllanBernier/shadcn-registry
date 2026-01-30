import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 px-3 py-2 text-base md:text-sm",
        "-rotate-1 shadow-lg",
        "bg-card text-card-foreground",
        "border-2 border-primary rounded-md",
        "font-bold",
        "placeholder:text-muted-foreground placeholder:font-normal",
        "focus:border-accent focus:ring-accent focus:ring-2 focus:outline-none",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
