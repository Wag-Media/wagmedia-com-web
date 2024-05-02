import { NavItemType } from "../components/Navigation/NavigationItem"

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
      id: "1",
      name: "Non Anglo",
      href: "/non-anglo",
    },
    {
      id: "2",
      name: "Newsletter",
      href: "/newsletter",
    },
    {
      id: "3",
      name: "News",
      href: "/news",
    },
    {
      id: "4",
      name: "Audit",
      href: "/audit",
    },
    {
      id: "5",
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
  },
}
