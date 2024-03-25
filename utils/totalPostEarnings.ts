import { ContentEarnings } from "@prisma/client"

export function totalEarnings(earnings: ContentEarnings[]): string | undefined {
  const nonZeroEarning = earnings.find((e) => e.totalAmount)

  if (!nonZeroEarning || !nonZeroEarning.totalAmount) return

  return `${nonZeroEarning.totalAmount.toFixed(2) ?? 0} ${nonZeroEarning?.unit}`
}
