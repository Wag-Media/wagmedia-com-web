import { PolkadotEvent } from "@prisma/client"
import { CalendarIcon, MapPin } from "lucide-react"

import { formatEventDates } from "../util"

export function EventCardSmall({ event }: { event: PolkadotEvent }) {
  return (
    <div key={event.id} className="flex flex-row gap-2 text-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.image ?? "/placeholder.svg"}
        alt={event.title}
        className="flex-none rounded-sm size-16"
      />
      <div className="flex flex-col justify-center gap-0.5 text-left">
        <div className="font-semibold">{event.title}</div>
        <div className="text-xs text-muted-foreground flex flex-col gap-0.5">
          <span className="flex items-center gap-x-1">
            <CalendarIcon className="flex-none inline-block w-3 h-3 size-3" />
            {event.isAllDay
              ? "All day"
              : formatEventDates({
                  startDate: event.startsAt,
                  endDate: event.endsAt,
                  withDate: false,
                })}
          </span>
          {event.location && (
            <span className="flex items-center gap-x-1">
              <MapPin className="flex-none inline-block w-3 h-3 size-3" />
              {event.location}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
