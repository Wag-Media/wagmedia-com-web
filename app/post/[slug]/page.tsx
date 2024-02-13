import Image from "next/image"
import { prisma } from "@/prisma/prisma"
import { Embed, Tag } from "@prisma/client"

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      tags: true,
      categories: true,
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
    },
  })

  if (!post) {
    return <div>No post found.</div>
  }

  return (
    <article className="p-6">
      <h1 className="text-lg font-bold">{post.title}</h1>
      <p className="mb-4">{post.content}</p>

      {post.embeds &&
        post.embeds.length > 0 &&
        post.embeds.map((embed: Embed) => (
          <Image
            src={embed.embedImage || ""}
            alt="Embed Image"
            className="mb-4"
            width={800}
            height={400}
          />
        ))}
      <div className="mb-4">
        <strong>Published:</strong> {post.createdAt.toLocaleDateString()}
      </div>
      <div className="mb-4">
        {post.isPublished ? "Published" : "Draft"}
        {post.isFeatured && <span> | Featured</span>}
      </div>
      <div className="pb-4">
        <h3 className="font-bold">Author:</h3>
        {post.user.avatar && (
          <Image
            className="h-8 rounded-full"
            src={post.user.avatar}
            width={30}
            height={30}
            alt={`${post.user.name}'s avatar`}
          />
        )}
        <span>{post.user.name}</span>
      </div>

      <div className="pb-4">
        <h3 className="font-bold">Links</h3>
        {post.discordLink && (
          <a href={post.discordLink} className="mb-4 block">
            Discord 🔗
          </a>
        )}
        {post.embeds &&
          post.embeds.length > 0 &&
          post.embeds.map((embed: Embed) => (
            <a href={embed.embedUrl || ""} className="mb-4 block">
              Original Content 🔗
            </a>
          ))}
      </div>

      {post.categories && post.categories.length > 0 && (
        <div className="mb-4">
          <strong>Categories:</strong>{" "}
          {post.categories.map((category) => category.name).join(", ")}
        </div>
      )}
      {post.tags && post.tags.length > 0 && (
        <div>
          <h3 className="font-bold">Tags</h3>
          <ul className="flex flex-row flex-wrap gap-4">
            {post.tags.map((tag: Tag) => (
              <li key={tag.id}>#{tag.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <b>Reactions:</b>
        <ul>
          {post.reactions.map((reaction) => (
            <li key={reaction.id}>
              {reaction.emoji.url ? (
                <Image
                  src={reaction.emoji.url}
                  alt={reaction.emoji.id}
                  width={30}
                  height={30}
                  className="inline-block"
                />
              ) : (
                <span className="align-middle text-[30px]">
                  {reaction.emojiId}
                </span>
              )}{" "}
              at {reaction.createdAt.toDateString()} from {reaction.user.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <b>Payments:</b>
        <ul>
          {post.payments.map((payment) => (
            <li key={payment.id}>
              {payment.amount} {payment.unit} at{" "}
              {payment.createdAt.toDateString()} from {post.user.name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
