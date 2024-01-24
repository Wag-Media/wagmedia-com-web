import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"

import { PostListItem } from "./post-list-item"

export function PostList({
  posts,
}: {
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {posts.map((post: PostWithTagsCategoriesReactionsPaymentsUser) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  )
}
