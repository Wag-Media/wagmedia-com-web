export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export function deslugify(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/(^\w|\s\w)/g, (letter) => letter.toUpperCase())
}
