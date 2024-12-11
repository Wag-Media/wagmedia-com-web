import { getTreasuryValues } from "@/actions/getTreasuryValues"
import { useQuery } from "@tanstack/react-query"

export function useTreasuryData() {
  return useQuery({
    queryKey: ["treasuryData"],
    queryFn: getTreasuryValues,
    staleTime: 43200000, // 12 hours
    refetchOnWindowFocus: false,
  })
}
