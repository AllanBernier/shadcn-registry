import * as React from "react"

interface ExampleProps {
  children?: React.ReactNode
  className?: string
}

export function Example({ children, className }: ExampleProps) {
  return (
    <div className={`rounded-lg border bg-card p-4 text-card-foreground shadow-sm ${className ?? ""}`}>
      {children ?? "This is an example component"}
    </div>
  )
}
