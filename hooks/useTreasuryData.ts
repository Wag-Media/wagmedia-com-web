import { getTreasuryValues } from "@/actions/getTreasuryValues"
import { useQuery } from "@tanstack/react-query"

export async function fetchTreasuryValues() {
  const result = await getTreasuryValues()
  if (!result.success) throw result.error
  return result
}

export function useTreasuryData() {
  return useQuery({
    queryKey: ["treasuryData"],
    queryFn: fetchTreasuryValues,
    staleTime: 43200000, // 12 hours
    refetchOnWindowFocus: false,
  })
}
