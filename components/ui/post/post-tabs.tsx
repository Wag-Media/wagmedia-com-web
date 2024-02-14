"use client"

import {
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs"

import { cn } from "../../../lib/utils"

export function PostTabs({
  tabs,
  selectedTab,
  className,
}: {
  tabs: Tab[]
  selectedTab?: string
  className?: string
}) {
  return (
    <Tabs defaultValue={tabs[0].label} className={cn("", className)}>
      <TabsList className="mb-4 sticky top-[4rem] self-start bg-background p-4">
        {tabs.map((tab) => (
          <TabsTrigger value={tab.label} key={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent value={tab.label} key={tab.label}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
