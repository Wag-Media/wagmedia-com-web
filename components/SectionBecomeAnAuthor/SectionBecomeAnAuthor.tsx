import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "../ui/button"

export default function SectionBecomeAnAuthor() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FF2670] to-[#E4FF07] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col space-y-8">
            <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl drop-shadow-lg">
              Join WagMedia and Evolve Your Content Creation Journey!
            </h2>
            <p className="text-xl text-white/90 drop-shadow">
              You can earn rewards with your contribution to our various
              programs and bounties. Read and share new perspectives on just
              about any Polkadot related topic. We welcome genuine participants
              at any level.
            </p>
            <Link href="/about#join" className="mt-2">
              <Button
                size="lg"
                className="bg-white text-[#FF2670] hover:bg-[#E4FF07] hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Become a Content Creator
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-square lg:aspect-[4/3]">
            <Image
              src="/become-wagmedia-author.svg"
              alt="Join WagMedia"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute bg-white rounded-full w-96 h-96 mix-blend-overlay filter blur-3xl -top-32 -left-32 animate-pulse"></div>
        <div className="w-96 h-96 bg-[#E4FF07] rounded-full mix-blend-overlay filter blur-3xl absolute -bottom-32 -right-32 animate-pulse"></div>
      </div>
    </section>
  )
}
