import Link from "next/link"
import { getAuthors } from "@/data/dbAuthors"

import Button from "@/components/Button/Button"
import CardAuthorBoxWag from "@/components/CardAuthorBox/CardAuthorBoxWag"
import Heading from "@/components/Heading/Heading"

export const metadata = {
  title: "Creators",
  description: "Explore all Polkadot Content Creators",
}

export default async function PageCreators({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const authors = await getAuthors({ limit: 200 })
  const sort = searchParams.sort as string

  const sortedAuthors =
    sort === "rewards"
      ? authors
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
      <p className="mb-8 text-center text-neutral-500">
        <Link href="/about#join">
          <Button pattern="primary">
            Become a Creator and get rewarded for your content
          </Button>
        </Link>
      </p>
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm text-neutral-500">Order By</span>
          <Link href={`/creators`}>
            <Button
              pattern={sort === "name" || !sort ? "default" : "secondary"}
            >
              Name
            </Button>
          </Link>
          <Link href={`/creators?sort=rewards`}>
            <Button
              pattern={sort === "rewards" ? "default" : "secondary"}
              className="text-sm"
            >
              Rewards
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8 ">
        {sortedAuthors.map((author) => (
          <CardAuthorBoxWag key={author.id} author={author} />
        ))}
      </div>
    </div>
  )
}
