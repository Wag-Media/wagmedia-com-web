export type EmbedType = "twitter" | "instagram" | "youtube"

export function removeSocialMediaEmbeds(text: string): string {
  // Patterns to match social media URLs/embeds
  const patterns = [
    /https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+\S*/gi, // Twitter/X status links
    /https?:\/\/(www\.)?youtu\.be\/[a-zA-Z0-9_-]+\S*/gi, // YouTube shortened links
    /https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+\S*/gi, // YouTube watch links
    /https?:\/\/(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\S*/gi, // Instagram post links
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
  return null
}
