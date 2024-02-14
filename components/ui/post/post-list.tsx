import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"

import { PostListItem } from "./post-list-item"

export function PostList({
  posts,
}: {
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
}) {
  return (
    <div className="flex flex-wrap">
      {posts.map((post: PostWithTagsCategoriesReactionsPaymentsUser) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  )
}
