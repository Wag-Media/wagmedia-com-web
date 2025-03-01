import Link from "next/link"
import { User } from "@prisma/client"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { HeroBackground } from "./hero-background"

export function Hero({
  authorAvatars,
  totalPostCount,
  totalAuthorCount,
  totalPostPaymentAmount,
}: {
  authorAvatars: Pick<User, "avatar" | "name">[]
  totalPostCount: number
  totalAuthorCount: number
  totalPostPaymentAmount: number | null
}) {
  // instead of having 32 authors, have 30+ instead of 141 posts, have 100+, 163 = 150+

  const roundedTotalAuthorCount = Math.round(totalAuthorCount / 10) * 10
  const roundedTotalPostCount = Math.round(totalPostCount / 10) * 10
  const roundedTotalPostPaymentAmount =
    Math.round(totalPostPaymentAmount || 0 / 100) * 100

  return (
    <section className="relative pt-12 pb-16 md:pt-36">
      <HeroBackground authorAvatars={authorAvatars} />
      <div className="container relative z-10">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-unbounded">
            Empower Your Voice in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#FF1F8C] to-[#38B6FF]">
              Web3
            </span>
          </h1>
          <p className="mb-6 text-xl font-light text-gray-700 md:text-2xl dark:text-gray-300 font-unbounded">
            Your ideas, your audience, your rewards.
          </p>
          <p className="max-w-3xl mx-auto mb-8 text-base text-gray-600 md:text-xl dark:text-gray-400 sm:mb-12">
            Join WagMedia to share groundbreaking stories, unleash your
            creativity, and shape the future of blockchain and Web3 content.
          </p>

          <div className="relative flex flex-col justify-center mb-8 space-y-4 md:space-y-0 md:space-x-8 md:flex-row">
            <div className="text-center">
              <p className="text-4xl font-bold">{roundedTotalAuthorCount}+</p>
              <p className="text-gray-600 dark:text-gray-400">
                Independent Creators
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">{roundedTotalPostCount}+</p>
              <p className="text-gray-600 dark:text-gray-400">Posts Created</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">{4000}+ DOT</p>
              <p className="text-gray-600 dark:text-gray-400">
                Paid to Creators
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/about#join">
              <Button
                size="lg"
                className="w-full group sm:w-auto gradient-button-primary"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gradient-button-outline"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
