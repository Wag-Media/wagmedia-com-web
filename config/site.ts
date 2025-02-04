export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "WagMedia",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  navMenuItems: [
    {
      id: "1",
      name: "Discover",
      href: "/discover",
      children: [
        {
          id: "1",
          name: "Categories",
          href: "/categories",
        },
        {
          id: "4",
          name: "News",
          href: "/polkadot-news",
        },
        {
          id: "8",
          name: "Memes",
          href: "/memes",
        },
      ],
    },
    {
      id: "201",
      name: "Community",
      href: "/community",
      children: [
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
          id: "9",
          name: "Creators",
          href: "/creators",
        },
        {
          id: "7",
          name: "Agent Tipping",
          href: "/agent-tipping",
        },
      ],
    },
    {
      id: "202",
      name: "Events",
      href: "/events",
    },
    {
      id: "5",
      name: "About",
      href: "/about",
      children: [
        {
          id: "115",
          name: "Audit",
          href: "/audit",
        },
        {
          id: "116",
          name: "About WagMedia",
          href: "/about",
        },
      ],
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
