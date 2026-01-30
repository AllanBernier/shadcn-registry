"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "-rotate-1 shadow-2xl bg-primary text-primary-foreground border-none",
          title: "font-bold uppercase",
          description: "text-primary-foreground/80",
          actionButton:
            "bg-accent text-accent-foreground font-bold uppercase",
          cancelButton:
            "bg-muted text-muted-foreground font-bold uppercase",
          error:
            "-rotate-1 shadow-2xl bg-destructive text-destructive-foreground border-none",
          success:
            "-rotate-1 shadow-2xl bg-accent text-accent-foreground border-none",
          warning:
            "-rotate-1 shadow-2xl bg-primary text-primary-foreground border-none",
          info:
            "-rotate-1 shadow-2xl bg-primary text-primary-foreground border-none",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
