import { Metadata } from "next"
import { getMemes } from "@/data/dbPosts"

import { slugify } from "@/lib/slug"

import { MemeGrid } from "./meme-grid"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Polkadot Memes",
  description:
    "By the community, for the community, about the community. Powered by WagMedia.",
}

export default async function MemesPage() {
  const dbMemes = await getMemes()

  const memes = dbMemes.map((meme) => ({
    id: meme.id,
    title: meme.title,
    image: meme.embeds[0]?.embedImage ?? "",
    width: meme.embeds[0]?.width ?? 0,
    height: meme.embeds[0]?.height ?? 0,
    author: {
      name: meme.user.name || "",
      avatar: meme.user.avatar || "/placeholder.svg",
    },
    categories: meme.categories.map((category) => ({
      slug: slugify(category.name),
      name: category.name,
    })),
    date: meme.createdAt.toISOString(),
    fundsReceived:
      meme.payments
        .reduce((acc, payment) => acc + payment.amount, 0)
        .toFixed(2) +
      " " +
      (meme.payments?.[0]?.unit ?? ""),
  }))

  return (
    <div className="px-4 py-16 container-fluid">
      <h1 className="mb-8 text-4xl font-bold text-center">Polkadot Memes</h1>
      <p className="mb-8 text-lg text-center">
        By the community, for the community, about the community. Powered by
        WagMedia.
      </p>
      <MemeGrid memes={memes} />
    </div>
  )
}
