export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "WagMedia",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Category",
      href: "/",
    },
    {
      title: "Non-Anglo",
      href: "/",
    },
    {
      title: "Finders",
      href: "/",
    },
    {
      title: "Audit",
      href: "/audit",
    },
    {
      title: "About",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
