import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import SubstackWidget from "./SubstackWidget/SubstackWidget"

export function SectionSubscribeNewsletter() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#FF2670] to-[#7916F3] text-white">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Stay Updated with WagMedia
          </h2>
          <p className="text-xl">
            Subscribe to our mail newsletter for free to receive regular updates
            and support our work
          </p>
        </div>
        {/* <form className="flex flex-col max-w-md gap-4 mx-auto sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow text-gray-900 placeholder-gray-500 bg-white"
            required
          />
          <Button
            type="submit"
            className="bg-[#E4FF07] text-gray-900 hover:bg-white hover:text-[#FF2670] transition-colors duration-300"
          >
            Subscribe
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form> */}
        <SubstackWidget className="flex justify-center mt-8" />
      </div>
    </section>
  )
}
