import React, { FC } from "react"
import Image from "next/image"
import rightImg from "@/images/SVG-subcribe2.png"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import Badge from "@/components/Badge/Badge"
import ButtonCircle from "@/components/Button/ButtonCircle"
import Input from "@/components/Input/Input"

import SubstackWidget from "../SubstackWidget/SubstackWidget"

export interface SectionSubscribe2Props {
  className?: string
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex mb-12 flex-col lg:flex-row items-center ${className}`}
    >
      <div className="shrink-0 mb-14 lg:mb-0 lg:me-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Don't miss out! 🎉</h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Thanks for reading WagMedia Weekly! Subscribe for free to receive new
          posts and support our work = this was probably taken from Substack, I
          was a bit lazy and used their generic button. That said, the context
          only applies to substack. I suggest removing it, as the two points
          below cover it.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Stay up to date with the latest news from the Polkadot Ecosystem
            </span>
          </li>
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Subscribe on Substack to receive emails
            </span>
          </li>
        </ul>
        <SubstackWidget className="mt-8" />
        {/* <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form> */}
      </div>
      <div className="flex-grow">
        <Image
          alt="subsc"
          sizes="(max-width: 768px) 100vw, 50vw"
          src={rightImg}
        />
      </div>
    </div>
  )
}

export default SectionSubscribe2
