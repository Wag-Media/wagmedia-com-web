export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "WagMedia",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  navMenuItems: [
    {
      id: "1",
      name: "Categories",
      href: "/categories",
    },
    {
      id: "2",
      name: "Non-Anglo",
      href: "/non-anglo",
    },
    {
      id: "3",
      name: "Newsletter",
      href: "/newsletter",
    },
    {
      id: "7",
      name: "Creators",
      href: "/creators",
    },
    {
      id: "4",
      name: "News",
      href: "/polkadot-news",
    },
    {
      id: "5",
      name: "Audit",
      href: "/audit",
    },
    {
      id: "6",
      name: "About",
      href: "/about",
    },
  ],
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
      title: "News",
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
    discord: "https://discord.gg/dTnkwXgJXT",
  },
}
