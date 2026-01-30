import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "-rotate-1 bg-primary/20 shadow-sm animate-pulse",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
