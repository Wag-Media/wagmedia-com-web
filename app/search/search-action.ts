"use server"

import { searchAuthors } from "@/data/dbAuthors"
import { searchCategories } from "@/data/dbCategories"
import { getPosts } from "@/data/dbPosts"
import { z } from "zod"

import { actionClient } from "@/lib/safe-action"

const searchSchema = z.object({
  query: z.string(),
})

export const searchAction = actionClient
  .schema(searchSchema)
  .action(async ({ parsedInput: { query } }) => {
    try {
      // Remove the prefix for the actual search
      const searchTerm = query.toLowerCase().replace(/^[#>@.]/, "")

      // Determine search type based on prefix
      const prefix = query.charAt(0)

      switch (prefix) {
        case "#":
        case ">":
          // Search only posts
          const posts = await getPosts({
            search: searchTerm,
            contentType: "article",
            take: 5,
          })
          return {
            success: true,
            data: { posts, authors: [], categories: [] },
          }

        case "@":
          // Search only authors
          const authors = await searchAuthors(searchTerm)
          return {
            success: true,
            data: { posts: [], authors, categories: [] },
          }

        case ".":
          // Search only categories
          const categories = await searchCategories(searchTerm)
          return {
            success: true,
            data: { posts: [], authors: [], categories },
          }

        default:
          // Search all (default behavior)
          const [allPosts, allAuthors, allCategories] = await Promise.all([
            getPosts({ search: searchTerm, contentType: "article", take: 5 }),
            searchAuthors(searchTerm),
            searchCategories(searchTerm),
          ])

          return {
            success: true,
            data: {
              posts: allPosts,
              authors: allAuthors,
              categories: allCategories,
            },
          }
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to perform search",
      }
    }
  })
