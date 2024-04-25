import { getAuthor, getAuthorsByIds } from "@/data/dbAuthors"

export type EmbedType = "twitter" | "instagram" | "youtube" | "vimeo" | "tiktok"

export function linkTextsToAnchorTags(text: string): string {
  // Patterns to match URLs
  const urlPattern =
    /((https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/gi

  // Replace URLs with anchor tags
  return text.replace(
    urlPattern,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  )
}

export function removeSocialMediaEmbeds(text: string): string {
  // Patterns to match social media URLs/embeds
  const patterns = [
    /https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+\S*/gi, // Twitter/X status links
    /https?:\/\/(www\.)?youtu\.be\/[a-zA-Z0-9_-]+\S*/gi, // YouTube shortened links
    /https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+\S*/gi, // YouTube watch links
    /https?:\/\/(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\S*/gi, // Instagram post links
    /https?:\/\/(www\.)?instagram\.com\/tv\/[a-zA-Z0-9_-]+\S*/gi, // Instagram TV links
    /https?:\/\/(www\.)?vimeo\.com\/[a-zA-Z0-9_-]+\S*/gi, // Vimeo links
    /https?:\/\/(www\.)?tiktok\.com\/[a-zA-Z0-9_@-]+\S*/gi, // TikTok links
  ]

  // Iterate over each pattern and replace it with an empty string
  patterns.forEach((pattern) => {
    text = text.replace(pattern, "")
  })

  return text
}

export function getEmbedType(url: string | null): EmbedType | null {
  if (!url) return null
  if (url.includes("https://twitter.com") || url.includes("https://x.com"))
    return "twitter"

  if (url.includes("instagram.com")) return "instagram"
  if (url.includes("youtube.com" || url.includes("youtu.be"))) return "youtube"
  if (url.includes("vimeo.com")) return "vimeo"
  if (url.includes("tiktok.com")) return "tiktok"

  return null
}

export async function replaceAuthorLinks(text: string): Promise<string> {
  // Patterns to match author URLs

  //should match <@813444371159842876>
  const authorPattern = /<@(\d+)>/gi

  const allAuthrorIds = text
    .match(authorPattern)
    ?.map((id) => id.replace("<@", "").replace(">", ""))
  if (!allAuthrorIds) return text

  const authors = await getAuthorsByIds(allAuthrorIds)
  if (!authors) return text

  console.log("authors", authors)

  //replace each author with a link to their profile
  authors.forEach((author) => {
    text = text.replace(
      new RegExp(`<@${author.discordId}>`, "gi"),
      `<a href="/author/${author.name}" className="no-underline"><img src="${author.avatar}" alt="${author.name}" class="w-5 h-5 rounded-full !p-0 !m-0 !mr-1 inline" />${author.name}</a>`
    )
  })

  return text
}
