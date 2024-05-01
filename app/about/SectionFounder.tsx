import React from "react"
import Link from "next/link"

import Heading from "@/components/Heading/Heading"
import NcImage from "@/components/NcImage/NcImage"

export interface People {
  id: string
  name: string
  job: string
  avatar: string
  twitter: string
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Ikhaled`,
    job: "ikhaled will be responsible for the general admin, Website development as Product owner and tester, and the translation program. He continues his duties as the administrator of WM, and was one of the original directors to run WM. Also an active member of the Kingdom Ventures.",
    avatar:
      "https://pbs.twimg.com/profile_images/1562871751729635330/5nNfm2H0_400x400.jpg",
    twitter: "https://twitter.com/ikhaled28",
  },
  {
    id: "4",
    name: `Goku`,
    job: "Goku will lead the content program and shall be supported by sub-directors who are already evaluating content. He is a senior Polkadot Ambassador, a member of ChaosDAO, and the existing director of the Paraverse Content Creators Unit.",
    avatar:
      "https://pbs.twimg.com/profile_images/1636615722267729920/Mjw-Wdzj_400x400.jpg",
    twitter: "https://twitter.com/0xgoku_",
  },
  {
    id: "3",
    name: `Vampsy`,
    job: "Vampsy will manage the treasury as well as do the monthly reporting. He is a member of the Kingdom Ventures and an economist.",
    avatar:
      "https://pbs.twimg.com/profile_images/1494805284837109761/PxFyrn89_400x400.jpg",
    twitter: "https://twitter.com/vampsyfear",
  },
  {
    id: "2",
    name: `Dodow`,
    job: "Dodow will run the sourced news finders program, as well as be the chief editor of the WM newsletter. He was one of the original directors elevated to run WM. Also a member of ChaosDAO and Kingdom Ventures.",
    avatar:
      "https://pbs.twimg.com/profile_images/1578419481612898304/GSTua3JI_400x400.jpg",
    twitter: "https://twitter.com/fashionistawong",
  },
]

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="We’re impartial and independent, and every day we create distinctive,
          world-class programmes and content"
      >
        ⛱ WagMedia Team
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <Link href={item.twitter}>
              <NcImage
                alt="founder"
                fill
                containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden z-0"
                className="absolute inset-0 object-cover"
                src={item.avatar}
              />
            </Link>
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionFounder
