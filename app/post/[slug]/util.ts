export type EmbedType = "twitter" | "instagram" | "youtube"

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
