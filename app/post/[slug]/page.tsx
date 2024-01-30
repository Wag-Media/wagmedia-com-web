import { prisma } from "@/prisma/prisma"

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
        },
      },
      payments: true,
      user: true,
    },
  })

  if (!post) {
    return <div>No post found.</div>
  }

  return (
    <article>
      <h1 className="text-lg font-bold">{post.title}</h1>
      <p className="mb-4">{post.content}</p>

      {post.embedImageUrl && (
        <img src={post.embedImageUrl} alt="Embed Image" className="mb-4" />
      )}

      <div className="mb-4">
        <strong>Published:</strong> {post.createdAt.toLocaleDateString()}
      </div>

      <div className="mb-4">
        {post.isPublished ? "Published" : "Draft"}
        {post.isFeatured && <span> | Featured</span>}
      </div>

      {post.discordLink && (
        <a href={post.discordLink} className="mb-4 block">
          Discord Discussion
        </a>
      )}

      {post.contentUrl && (
        <a href={post.contentUrl} className="mb-4 block">
          Related Content
        </a>
      )}

      {post.categories && post.categories.length > 0 && (
        <div className="mb-4">
          <strong>Categories:</strong>{" "}
          {post.categories.map((category) => category.name).join(", ")}
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <strong>Tags:</strong> {post.tags.map((tag) => tag.name).join(", ")}
        </div>
      )}

      {/* Additional fields like reactions, earnings, and payments can be rendered as needed */}
    </article>
  )
}
