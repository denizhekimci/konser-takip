import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'

type Props = {
  from?: string
  to?: string
  onChange: (range: { from?: string; to?: string }) => void
}

const toDate = (value?: string) => (value ? parseISO(value) : undefined)
const toIso = (date?: Date) => (date ? format(date, 'yyyy-MM-dd') : undefined)

export function DateRangeFilter({ from, to, onChange }: Props) {
  const selected: DateRange | undefined = from
    ? { from: toDate(from), to: toDate(to) }
    : undefined

  function handleSelect(range: DateRange | undefined) {
    onChange({ from: toIso(range?.from), to: toIso(range?.to) })
  }

  const label = from
    ? `${format(parseISO(from), 'd MMM', { locale: tr })}${
        to ? ` – ${format(parseISO(to), 'd MMM', { locale: tr })}` : ' –'
      }`
    : 'Tarih seç'

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        {label}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          locale={tr}
          resetOnSelect
        ></Calendar>
        {from && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onChange({})}
            >
              Temizle
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
