import avatar1 from "@/data/avatars/1.jpg"
import { getAuthorAvatars } from "@/data/dbAuthors"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { HeroBackground } from "./HeroBackground"

export async function Hero() {
  const users = await getAuthorAvatars()

  return (
    <section className="relative pt-20 pb-10 overflow-hidden sm:pt-24 ">
      {/* <HeroBackground users={users} /> */}
      <div className="container relative z-10">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-unbounded">
            Empowering Your Voice in{" "}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <span className="cursor-pointer bg-gradient-to-r from-[#FF2670] to-[#ffac07] text-transparent bg-clip-text">
                    Web3
                  </span>
                </TooltipTrigger>
                <TooltipContent className="px-6 py-4 text-left">
                  <p className="text-sm font-light tracking-normal">
                    Web3 is an idea for a new iteration of the World Wide Web
                    which incorporates concepts such as decentralization,
                    blockchain technologies, and token-based economics. <br />
                    <br />
                    The term &quot;web3&quot; was coined in 2014 by Ethereum
                    co-founder and{" "}
                    <span className="text-[var(--polkadot-pink)]">
                      Polkadot{" "}
                    </span>
                    founder Gavin Wood, and the idea gained interest in 2021
                    from cryptocurrency enthusiasts, large technology companies,
                    and venture capital firms.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
              className="w-full sm:w-auto bg-gradient-to-r from-[#ffac07] to-[#FF2670] text-white hover:bg-gradient-to-r hover:scale-105 transition-all duration-500"
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
