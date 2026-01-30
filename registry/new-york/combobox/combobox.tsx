"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredOptions = React.useMemo(() => {
    if (!search) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [options, search])

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue)
    setOpen(false)
    setSearch("")
  }

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          data-slot="combobox-trigger"
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 px-4 py-2",
            "-rotate-1 border-2 border-primary bg-card text-card-foreground shadow-2xl",
            "font-bold uppercase text-sm",
            "transition-transform hover:rotate-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0",
            className
          )}
        >
          <span className={cn(!selectedOption && "text-muted-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon
            data-slot="combobox-chevron"
            className={cn(
              "size-4 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="combobox-content"
          className={cn(
            "-rotate-1 bg-card text-card-foreground shadow-2xl",
            "border-2 border-primary",
            "z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          )}
          sideOffset={4}
          align="start"
        >
          <div
            data-slot="combobox-input-wrapper"
            className="flex items-center gap-2 border-b-2 border-primary px-3 py-2"
          >
            <SearchIcon
              data-slot="combobox-search-icon"
              className="size-4 text-muted-foreground shrink-0"
            />
            <input
              ref={inputRef}
              data-slot="combobox-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                "flex-1 bg-transparent text-sm outline-none",
                "placeholder:text-muted-foreground font-bold uppercase"
              )}
            />
          </div>
          <div
            data-slot="combobox-list"
            className="max-h-60 overflow-y-auto p-1"
            role="listbox"
          >
            {filteredOptions.length === 0 ? (
              <div
                data-slot="combobox-empty"
                className="px-3 py-6 text-center text-sm text-muted-foreground font-bold uppercase"
              >
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  data-slot="combobox-item"
                  role="option"
                  aria-selected={value === option.value}
                  aria-disabled={option.disabled}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-2 px-3 py-2 text-sm",
                    "font-bold uppercase transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    value === option.value && "bg-primary text-primary-foreground",
                    option.disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  <span className="flex-1">{option.label}</span>
                  {value === option.value && (
                    <CheckIcon
                      data-slot="combobox-check-icon"
                      className="size-4 shrink-0"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { Combobox, type ComboboxOption, type ComboboxProps }
