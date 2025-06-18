"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
}

export function DatePicker({ value, onChange, label }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-3">
      {/* {label && (
        <Label className="text-sm font-medium text-neutral-100">
          {label}
        </Label>
      )} */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-neutral-50"
          >
            {value ? value.toLocaleDateString() : "Selecione uma data"}
            <ChevronDownIcon className="text-neutral-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 bg-neutral-800 border-neutral-700" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            className="bg-neutral-800 text-neutral-100"
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
