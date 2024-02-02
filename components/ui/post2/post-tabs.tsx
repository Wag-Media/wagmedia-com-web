"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs"

export function PostTabs({ selectedTab }: { selectedTab?: string }) {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="latest">Latest</TabsTrigger>
        <TabsTrigger value="most-liked">Most Liked</TabsTrigger>
        <TabsTrigger value="trending">Trending</TabsTrigger>
      </TabsList>
      <TabsContent value="latest">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="most-liked">Change your password here.</TabsContent>
      <TabsContent value="trending">Change your password here.</TabsContent>
    </Tabs>
  )
}
