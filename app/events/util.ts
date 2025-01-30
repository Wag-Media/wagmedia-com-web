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
    // Handle all-day and multi-day events
    if (!event.startDate) return false

    const startDate = new Date(event.startDate)
    startDate.setHours(0, 0, 0, 0)

    const endDate = event.endDate
      ? new Date(event.endDate)
      : new Date(startDate)
    endDate.setHours(23, 59, 59, 999)

    return date >= startDate && date <= endDate
  })
}
