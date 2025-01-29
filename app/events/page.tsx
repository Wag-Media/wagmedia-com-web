import { Metadata } from "next"

import { Headline } from "@/components/ui/headline"

import Calendar from "./calendar"

export const metadata: Metadata = {
  title: "Polkadot Events Calendar",
  description: "Never miss an event in web3",
}

export default function EventsPage() {
  return (
    <div className="container relative py-4 mx-auto md:py-8 lg:py-16 ">
      <Headline level="h1" subtitle="Never miss an event in web3">
        Polkadot Events Calendar
      </Headline>
      <Calendar />
    </div>
  )
}
