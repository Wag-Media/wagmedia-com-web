import React from "react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Headline } from "@/components/ui/headline"
import { YouTubeEmbedDisplay } from "@/components/YouTubeEmbed"

export const metadata = {
  title: "About",
  description: "About WagMedia and how to join the community.",
}

export interface People {
  id: string
  name: string
  job: string
  avatar: string
  twitter: string
}

const TEAM: People[] = [
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
    job: "Goku leads the general content program, including bounties. He has been involved with the Polkadot community for a long time and also serves as one of the seven members on Polkadot’s social media editorial board.",
    avatar:
      "https://pbs.twimg.com/profile_images/1636615722267729920/Mjw-Wdzj_400x400.jpg",
    twitter: "https://twitter.com/0xgoku_",
  },
  {
    id: "3",
    name: `Vampsy`,
    job: "Vampsy will analyze the data on WagMedia's content production and payouts, and publish a monthly report. He is a PhD economist, specializing in game theory and market design, and member of Kingdom Ventures.",
    avatar:
      "https://pbs.twimg.com/profile_images/1494805284837109761/PxFyrn89_400x400.jpg",
    twitter: "https://twitter.com/vampsyfear",
  },
  {
    id: "2",
    name: `Dodow`,
    job: "Dodow will run the sourced news finders program, as well as be the chief editor of the WM newsletter. He was one of the original directors elevated to run WM. Also a member of ChaosDAO and Kingdom Ventures.",
    avatar:
      "https://cdn.discordapp.com/attachments/1205836446309679144/1237078821589487616/image.png?ex=663a56ee&is=6639056e&hm=dae89bf6736a8cbe413fe8651d8cb983815288dd708e01e94ecd50e44d0b82c1&",
    twitter: "https://twitter.com/fashionistawong",
  },
]

export default function PageAbout() {
  return (
    <div className={`nc-PageAbout relative mb-20`}>
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <Headline level="h1">About WagMedia</Headline>
          <p className="max-w-3xl mx-auto">
            WagMedia decentralizes the story of Dotsama by incentivizing
            stakeholders to curate, share, create, and promote content of all
            languages in an open and transparent manner.
          </p>
          <p className="max-w-3xl mx-auto mt-4">
            Founded in December 2021, WagMedia (WM) addresses the Polkadot
            ecosystem information distribution problem as it seeks to counter
            the diminishing ability of network participants to make informed
            decisions as the network grows. To achieve this, WM incentivizes
            individuals to discover, develop, and distribute network-related
            content.
          </p>
          <p className="max-w-3xl mx-auto mt-4">
            Participants can join the WM Discord server, register with their
            Substrate and EVM addresses, and engage in actions that align with
            the content objectives of participating treasuries. Contributors get
            rewarded based on their server actions and receive payouts from the
            respective treasuries every Monday.
          </p>
        </div>
      </section>

      {/* How to Join Tutorial Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 mb-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-semibold" id="join">
                1. How to Join WagMedia
              </h3>
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <YouTubeEmbedDisplay
                  url="https://www.youtube.com/watch?v=zfznEfzjGPA"
                  width="100%"
                  height="100%"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-semibold">
                2. What is WagMedia?
              </h3>
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <YouTubeEmbedDisplay
                  url="https://www.youtube.com/watch?v=MLZmbo-ZsHk"
                  width="100%"
                  height="100%"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <h3 className="mb-4 text-2xl font-semibold text-center">
              Getting Started in 5 Easy Steps
            </h3>
            <ol className="pl-6 space-y-4 list-decimal">
              <li>
                First you must enter our discord server through{" "}
                <a
                  className="underline transition-colors underline-offset-2 text-primary hover:text-primary-700 "
                  href="https://discord.gg/FjMpPdwRaC"
                >
                  <span className="text-blue-500">this handy link</span>
                </a>
              </li>
              <li>
                Our server uses a bot to verify your addresses and hand out
                rewards. Be sure to allow private messages in personal settings
                or server settings to allow{" "}
                <i className="font-italic">
                  <span className="text-purple-500">
                    <strong className="font-bold">The Concierge</strong>
                  </span>
                </i>{" "}
                to reach out and register your reward addresses.
              </li>
              <li>
                React with an emoji on the message in{" "}
                <code className="font-bold text-purple-500">
                  #🪤│front-desk
                </code>
                .
              </li>
              <li>
                The Concierge will DM you. Message him{" "}
                <code className="font-bold text-purple-500">!wagmi</code> and he
                offer you options for registering your address or Twitter
                handle.
              </li>
              <li>
                Once you have been verified, introduce yourself in the{" "}
                <code className="font-bold text-purple-500">#New-Here</code>{" "}
                channel that will have magically appeared in the discord channel
                list.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center font-unbounded">
            Meet Our Team
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {TEAM.map((member) => (
              <Card key={member.name} className="rounded-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.job}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Funding History Section */}
      <section className="py-16">
        <div className="container max-w-3xl px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center font-unbounded">
            Our Funding Journey
          </h2>
          WM was originally funded via the Kusama treasury, here are more
          details on the{" "}
          <a
            className="underline"
            href="https://docs.google.com/document/d/1m9Bo8fH408BV5t2ODvindl4S0W2BfbtDxrwAl9j71k0/edit#heading=h.gjdgxs"
            rel="nofollow"
          >
            original proposal
          </a>{" "}
          and subsequent{" "}
          <a
            className="underline"
            href="https://docs.google.com/document/d/15ZD-8p_ST0vAcp9nRtwyEe0ZicMeqLuMhV9cNwP_hN0/edit"
            rel="nofollow"
          >
            bounty top-up
          </a>{" "}
          both received in 2022. Currently WagMedia is operating under{" "}
          <a
            className="underline"
            href="https://polkadot.subsquare.io/referenda/1130"
            rel="nofollow"
          >
            Polkadot OpenGov Referendum 1130
          </a>
          .
          {/* <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-24 mr-4 text-right">
                  <span className="text-sm font-semibold">2022 Q2</span>
                </div>
                <div className="flex-grow pl-4 border-l-2 border-gray-300">
                  <h3 className="text-lg font-semibold">Seed Round</h3>
                  <p className="text-gray-600">
                    Raised $1.5M to kickstart our platform development
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-24 mr-4 text-right">
                  <span className="text-sm font-semibold">2023 Q1</span>
                </div>
                <div className="flex-grow pl-4 border-l-2 border-gray-300">
                  <h3 className="text-lg font-semibold">Series A</h3>
                  <p className="text-gray-600">
                    Secured $5M to expand our team and enhance platform features
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-24 mr-4 text-right">
                  <span className="text-sm font-semibold">2024 Q1</span>
                </div>
                <div className="flex-grow pl-4 border-l-2 border-gray-300">
                  <h3 className="text-lg font-semibold">
                    Community Token Sale
                  </h3>
                  <p className="text-gray-600">
                    Raised $10M through a successful token sale to our community
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
}
