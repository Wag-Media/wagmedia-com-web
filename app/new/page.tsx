import { getAuthorAvatars, getAuthors } from "@/data/dbAuthors"
import { getFeaturedPosts, getPosts } from "@/data/dbPosts"

import { slugify } from "@/lib/slug"
import { ContentCreators } from "@/components/ContentCreators"
import { FeaturedPostsSlider } from "@/components/FeaturedPostsSlider"
import { FontPicker } from "@/components/FontPicker"
import { Hero } from "@/components/Hero"
import { JoinCTA } from "@/components/JoinCTA"
import { LatestArticles } from "@/components/LatestArticles"

import { fetchPosts } from "../actions/fetchPosts"
import { replaceAuthorLinks } from "../post/[slug]/util"

export default async function Page() {
  const featuredPosts = (await getFeaturedPosts()).map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.content,
    image: post.embeds?.[0]?.embedImage,
    categories: post.categories.map((category) => ({
      name: category.name,
      slug: slugify(category.name),
    })),
    slug: post.slug,
    author: {
      name: post.user.name,
      avatar: post.user.avatar,
    },
    date: post.createdAt.toISOString(),
    fundsReceived: `${post.earnings.reduce(
      (acc, curr) => acc + curr.totalAmount,
      0
    )} ${post.earnings[0]?.unit || "USD"}`,
  }))

  const latestArticles = (
    await getPosts({
      search: "",
    })
  ).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    categories: post.categories.map((category) => ({
      name: category.name,
      slug: slugify(category.name),
    })),
    excerpt: post.content,
    image: post.embeds?.[0]?.embedImage,
    author: {
      name: post.user.name,
      avatar: post.user.avatar,
    },
    date: post.createdAt.toLocaleDateString(),
    fundsReceived: `${post.earnings.reduce(
      (acc, curr) => acc + curr.totalAmount,
      0
    )} ${post.earnings[0]?.unit || "USD"}`,
  }))

  const postsWithLinks = await Promise.all(
    latestArticles.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      return { ...post, title }
    })
  )

  const creators = await getAuthors({ limit: 10 })

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-grow">
        <Hero />

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container">
            <h2 className="mb-8 text-3xl font-bold text-center">
              Featured Posts
            </h2>
            <FeaturedPostsSlider posts={featuredPosts} />
          </div>
        </section>

        <LatestArticles posts={postsWithLinks} />
        <ContentCreators creators={creators} />
        <JoinCTA />
      </main>
    </div>
  )
}
