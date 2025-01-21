import { getPosts } from "@/data/dbPosts"
import { useQuery } from "@tanstack/react-query"

export async function fetchPosts(search: string) {
  const posts = await getPosts({
    skip: 0,
    take: 10,
    search,
    contentType: "article",
  })
  return posts
}

export function usePosts(search: string) {
  return useQuery({
    queryKey: ["posts", search],
    queryFn: () => fetchPosts(search),
  })
}
