import { PolkadotEvent } from "@prisma/client"

// Add these utility functions at the top of the file
export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function generateCalendarDays(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Get last days of previous month to fill the first week
  const daysInPrevMonth = getDaysInMonth(year, month - 1)
  const prevMonthDays = Array.from(
    { length: (firstDayOfMonth + 6) % 7 },
    (_, i) => ({
      date: `${year}-${String(month).padStart(2, "0")}-${String(
        daysInPrevMonth - ((firstDayOfMonth + 6) % 7) + i + 1
      ).padStart(2, "0")}`,
      isCurrentMonth: false,
      isToday: false,
    })
  )

  // Current month days
  const today = new Date()
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i + 1
    ).padStart(2, "0")}`,
    isCurrentMonth: true,
    isToday:
      i + 1 === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear(),
  }))

  // Calculate how many days we need from next month
  const totalDays = 42 // 6 weeks * 7 days
  const remainingDays =
    totalDays - prevMonthDays.length - currentMonthDays.length
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
    date: `${year}-${String(month + 2).padStart(2, "0")}-${String(
      i + 1
    ).padStart(2, "0")}`,
    isCurrentMonth: false,
    isToday: false,
  }))

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
}

export function getEventsForDate(
  events: Array<PolkadotEvent>,
  dateStr: string
): Array<PolkadotEvent> {
  const date = new Date(dateStr)
  date.setHours(0, 0, 0, 0)

  return events.filter((event) => {
    if (!event.startDate) return false

    const startDate = new Date(event.startDate)
    startDate.setHours(0, 0, 0, 0)

    // For recurring events, use recurrenceEndDate if available, otherwise use endDate
    const endDate =
      event.recurrencePattern && event.recurrenceEndDate
        ? new Date(event.recurrenceEndDate)
        : event.endDate
        ? new Date(event.endDate)
        : new Date(startDate)
    endDate.setHours(23, 59, 59, 999)

    // Check if date is within the overall event range
    if (date < startDate || date > endDate) return false

    // Handle non-recurring events
    if (!event.recurrencePattern) return true

    // Handle recurring events based on pattern
    switch (event.recurrencePattern) {
      case "weekly":
        return date.getDay() === startDate.getDay()
      case "monthly":
        return date.getDate() === startDate.getDate()
      case "daily":
        return true
      default:
        return false
    }
  })
}

export function formatEventDates({
  startDate,
  endDate,
  withDate = true,
  withTime = true,
}: {
  startDate: Date | null
  endDate: Date | null
  withDate?: boolean
  withTime?: boolean
}) {
  // Handle cases where only one date is provided
  if (!startDate && !endDate) return ""
  if (startDate && !endDate) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }
    const formattedDate = startDate.toLocaleDateString("en-US", dateOptions)
    const formattedTime = startDate.toLocaleTimeString("en-US", timeOptions)
    return `${withDate ? formattedDate : ""} ${
      withTime ? `${formattedTime} UTC` : ""
    }`.trim()
  }
  if (!startDate && endDate) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }
    const formattedDate = endDate.toLocaleDateString("en-US", dateOptions)
    const formattedTime = endDate.toLocaleTimeString("en-US", timeOptions)
    return `${withDate ? formattedDate : ""} ${
      withTime ? `${formattedTime} UTC` : ""
    }`.trim()
  }

  // Rest of the existing function for when both dates are present
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }

  // Format dates
  const formattedStartDate = startDate
    ? startDate.toLocaleDateString("en-US", dateOptions)
    : ""
  const formattedEndDate = endDate
    ? endDate.toLocaleDateString("en-US", dateOptions)
    : ""
  const formattedStartTime = startDate
    ? startDate.toLocaleTimeString("en-US", timeOptions)
    : ""
  const formattedEndTime = endDate
    ? endDate.toLocaleTimeString("en-US", timeOptions)
    : ""

  // Same day event
  if (formattedStartDate === formattedEndDate)
    return `${withDate ? formattedStartDate : ""} ${
      withTime ? `${formattedStartTime} - ${formattedEndTime} UTC` : ""
    }`.trim()

  // Different days event
  return `${withDate ? formattedStartDate : ""} ${
    withTime ? `${formattedStartTime}` : ""
  } - ${withDate ? formattedEndDate : ""} ${
    withTime ? `${formattedEndTime} UTC` : ""
  }`.trim()
}

function generateRRule(
  recurrencePattern: string | null,
  recurrenceEndDate: Date | null
): string {
  if (!recurrencePattern) return ""

  const rruleBase = "RRULE:FREQ="
  const untilPart = recurrenceEndDate
    ? `;UNTIL=${
        recurrenceEndDate.toISOString().replace(/[-:]/g, "").split(".")[0]
      }Z`
    : ""

  switch (recurrencePattern.toLowerCase()) {
    case "daily":
      return `${rruleBase}DAILY${untilPart}`
    case "weekly":
      return `${rruleBase}WEEKLY${untilPart}`
    case "monthly":
      return `${rruleBase}MONTHLY${untilPart}`
    default:
      return ""
  }
}

interface ICalEventParams {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date | null
  recurrencePattern: string | null
  recurrenceEndDate?: Date | null
}

export function generateICalEvent({
  title,
  description,
  location,
  startDate,
  endDate,
  recurrencePattern,
  recurrenceEndDate,
}: ICalEventParams): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const start = startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const end = endDate
    ? endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    : start

  const rrule = generateRRule(recurrencePattern, endDate)

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Polkadot Events//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    rrule,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n")
}
