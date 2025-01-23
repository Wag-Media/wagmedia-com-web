import { Metadata } from "next"
import Link from "next/link"
import { getAuthors } from "@/data/dbAuthors"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardAuthorBoxWag from "@/components/CardAuthorBox/CardAuthorBoxWag"
import Heading from "@/components/Heading/Heading"

export const metadata: Metadata = {
  title: "Creators",
  description: "Explore all Polkadot Content Creators",
}

export default async function PageCreators({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const authors = (await getAuthors({ limit: 200 })).filter(
    (author) => author.posts.length > 0
  )
  const sort = searchParams.sort as string

  const sortedAuthors =
    sort === "rewards"
      ? authors
      : sort === "posts"
      ? authors.sort((a, b) => b.posts.length - a.posts.length)
      : authors.sort((a, b) => {
          // Handle cases where either name is null/undefined
          if (!a.name && !b.name) return 0
          if (!a.name) return 1 // null names go to the end
          if (!b.name) return -1
          return a.name.localeCompare(b.name)
        })

  return (
    <div className="container relative py-4 md:py-8 lg:py-16">
      <Heading
        desc="Our growing group of creators will help you identify content of interest, enabling you to deepen your understanding of Polkadot."
        isCenter
      >
        WagMedia Content Creators
      </Heading>
      <div className="flex flex-col items-center justify-end">
        <Tabs
          defaultValue={"name"}
          className="relative flex flex-col items-center mb-8"
        >
          <TabsList className="relative z-10 grid w-full grid-cols-4">
            <div className="ml-2 text-sm font-bold border-r">Order By</div>
            <TabsTrigger value="name" className="ml-1 font-sans">
              <Link href={`/creators`}>Name</Link>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="font-sans">
              <Link href={`/creators?sort=rewards`}>Rewards</Link>
            </TabsTrigger>
            <TabsTrigger value="posts" className="font-sans">
              <Link href={`/creators/?sort=posts`}>Posts</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedAuthors.map((author) => (
            <CardAuthorBoxWag key={author.id} author={author} />
          ))}
        </div>
        <Link href="/about#join">
          <Button>Become a Creator and get rewarded for your content</Button>
        </Link>
      </div>
    </div>
  )
}
