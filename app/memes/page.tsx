import { getMemes } from "@/data/dbPosts"

import { slugify } from "@/lib/slug"

import { MemeGrid } from "./meme-grid"

export default async function MemesPage() {
  const dbMemes = await getMemes()

  const memes = dbMemes.map((meme) => ({
    id: meme.id,
    title: meme.title,
    image: meme.embeds[0]?.embedImage ?? "",
    width: meme.embeds[0]?.width ?? 0,
    height: meme.embeds[0]?.height ?? 0,
    author: meme.user.name,
    categories: meme.categories.map((category) => ({
      slug: slugify(category.name),
      name: category.name,
    })),
    date: meme.createdAt.toISOString(),
    fundsReceived: meme.payments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    ),
  }))

  return (
    <div className="px-4 py-16 container-fluid">
      <h1 className="mb-8 text-4xl font-bold text-center">WagMedia Memes</h1>
      <MemeGrid memes={memes} />
    </div>
  )
}
