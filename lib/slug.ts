export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export function deslugify(slug: string): string {
  // Remove trailing unix timestamp (both date format and milliseconds)
  slug = slug
    .replace(/-\d{4}-\d{2}-\d{2}$/, "") // Remove YYYY-MM-DD format
    .replace(/-\d{13}$/, "") // Remove millisecond timestamp

  return slug
    .replace(/-/g, " ")
    .replace(/(^\w|\s\w)/g, (letter) => letter.toUpperCase())
}
