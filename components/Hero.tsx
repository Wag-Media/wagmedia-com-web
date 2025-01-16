import avatar1 from "@/data/avatars/1.jpg"
import { getAuthorAvatars } from "@/data/dbAuthors"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { HeroBackground } from "./HeroBackground"

export async function Hero() {
  const users = await getAuthorAvatars()

  return (
    <section className="relative pt-20 pb-10 overflow-hidden sm:pt-24 ">
      {/* <HeroBackground users={users} /> */}
      <div className="container relative z-10">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-unbounded">
            Empower Your Voice <br /> in the Web3 Revolution
          </h1>
          <p className="mb-6 text-2xl font-light text-gray-700 dark:text-white font-unbounded">
            Your content, your audience, your rewards.
          </p>
          <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600 dark:text-white sm:mb-12">
            Join WagMedia to share stories, articles and news and shape the
            future of blockchain and Web3 content.{" "}
          </p>

          <div className="flex justify-center mb-8 space-x-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#FF2670]">500+</p>
              <p className="text-gray-600">Independent Creators</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#FF2670]">1M+</p>
              <p className="text-gray-600">Posts Created</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#FF2670]">$5M+</p>
              <p className="text-gray-600">Paid to Creators</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#FF2670] text-white hover:bg-[#E4FF07] hover:text-black"
            >
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#FF2670] text-[#FF2670] hover:bg-[#FF2670] hover:text-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
