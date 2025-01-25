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
    <section className="relative pt-24 pb-16">
      <HeroBackground authorAvatars={authorAvatars} />
      <div className="container relative z-10">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-unbounded">
            Empower Your Voice in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2670] to-[#7916F3]">
              Web3
            </span>
          </h1>
          <p className="mb-6 text-2xl font-light text-gray-700 dark:text-gray-300 font-unbounded">
            Your ideas, your audience, your rewards.
          </p>
          <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-400 sm:mb-12">
            Join{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2670] to-[#7916F3]">
              WagMedia
            </span>{" "}
            to share groundbreaking stories, unleash your creativity, and shape
            the future of blockchain and Web3 content.
          </p>

          <div className="relative flex justify-center mb-8 space-x-8">
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
              <p className="text-4xl font-bold">
                ${roundedTotalPostPaymentAmount.toFixed(0)}+
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Paid to Creators
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/about#join">
              <Button
                size="lg"
                className="group transition-all duration-300  w-full sm:w-auto bg-[#FF2670] text-white hover:bg-[#7916F3] hover:text-white hover:scale-105"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-[#FF2670] text-[#FF2670] bg-background/80 hover:border-[#7916F3] hover:text-[#7916F3]"
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
