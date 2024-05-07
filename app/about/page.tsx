import React from "react"
import Image from "next/image"
import rightImg from "@/public/wagmedia-about.jpeg"
import { YouTubeEmbed } from "react-social-media-embed"

import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism"
import Button from "@/components/Button/Button"
import Heading from "@/components/Heading/Heading"
import { YouTubeEmbedDisplay } from "@/components/YouTubeEmbed"

import SectionFounder from "./SectionFounder"

export const metadata = {
  title: "About",
  description: "About WagMedia and how to join the community.",
}

const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <div className={`nc-SectionHero relative`}>
          <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 rtl:space-x-reverse items-center relative text-center lg:text-left">
            <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
              <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
                👋 About WagMedia
              </h2>
              <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
                <p className="mt-4">
                  WagMedia decentralizes the story of Dotsama by incentivizing
                  stakeholders to curate, share, create, and promote content of
                  all languages in an open and transparent manner.
                </p>
                <p className="mt-4">
                  Founded in December 2021, WagMedia (WM) addresses the Polkadot
                  ecosystem information distribution problem as it seeks to
                  counter the diminishing ability of network participants to
                  make informed decisions as the network grows. To achieve this,
                  WM incentivizes individuals to discover, develop, and
                  distribute network-related content.
                </p>
                <p className="mt-4">
                  Participants can join the WM Discord server, register with
                  their Substrate and EVM addresses, and engage in actions that
                  align with the content objectives of participating treasuries.
                  Contributors get rewarded based on their server actions and
                  receive payouts from the respective treasuries every Monday.
                </p>
                <Button href="https://discord.gg/FjMpPdwRaC" className="mt-8">
                  → Read More in our Wiki
                </Button>
              </span>
            </div>
            <div className="flex-grow">
              <Image className="w-full" src={rightImg} alt="" />
            </div>
          </div>
        </div>

        <div className={`nc-SectionHero relative`}>
          <h2
            id="join"
            className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100 mb-8"
          >
            🥳 How to Join
          </h2>
          <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 items-start relative text-center lg:text-left justify-between">
            <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
              <ol className="list-decimal ml-4 space-y-2 flex flex-col [&amp;>li]:gap-[1ch] [counter-reset:list-decimal] [&amp;>li]:flex [&amp;>li]:flex-row [&amp;>li>.bullet]:tabular-nums [&amp;>li>.bullet]:whitespace-nowrap [&amp;>li>.bullet]:list-decimal [&amp;>li>.bullet]:before:h-[1lh] [&amp;>li>.bullet]:before:leading-[inherit] [&amp;>li>.bullet]:before:flex [&amp;>li>.bullet]:text-dark/6 [&amp;>li>div_div]:mt-0 dark:[&amp;>li>.bullet]:text-light/6 max-w-3xl w-full mx-auto decoration-primary/6 page-api-block:ml-0 text-left">
                <li value="1" className="leading-normal">
                  <div
                    data-value="1"
                    className="bullet ListItem_olListItemBullet__9X19L text-base"
                  ></div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <p className="max-w-3xl w-full mx-auto decoration-primary/6 leading-normal min-h-[1lh] flip-heading-hash">
                      First you must enter the discord through{" "}
                      <a
                        className="underline underline-offset-2 text-primary hover:text-primary-700 transition-colors "
                        href="https://discord.gg/FjMpPdwRaC"
                      >
                        <span className="text-blue-500">this handy link</span>
                      </a>
                    </p>
                  </div>
                </li>
                <li value="2" className="leading-normal">
                  <div
                    data-value="2"
                    className="bullet ListItem_olListItemBullet__9X19L text-base"
                  ></div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <p className="max-w-3xl w-full mx-auto decoration-primary/6 leading-normal min-h-[1lh] flip-heading-hash">
                      Our server uses a bot to verify your addresses and hand
                      out rewards. Be sure to allow private messages to allow{" "}
                      <i className="font-italic">
                        <span className="text-purple-500">
                          <strong className="font-bold">The Concierge</strong>
                        </span>
                      </i>{" "}
                      to reach out and register your reward addresses.
                      <span className="mt-4 block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt=""
                          loading="lazy"
                          className="inline ZoomImage_zoomImg__teSyL"
                          src="https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252Fcv1mGoC2T0HJN1QW9pu6%252FScreen%2520Shot%25202022-06-16%2520at%25203.02.58%2520PM.png%3Falt%3Dmedia%26token%3D58f0811f-f96c-4a42-bee2-1b4ed4005bbf&amp;width=300&amp;dpr=4&amp;quality=100&amp;sign=842a69ffc91ebb5bfef7f66731b2b818c5b2c143f02840511edc368a153e7e69"
                          srcSet="https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252Fcv1mGoC2T0HJN1QW9pu6%252FScreen%2520Shot%25202022-06-16%2520at%25203.02.58%2520PM.png%3Falt%3Dmedia%26token%3D58f0811f-f96c-4a42-bee2-1b4ed4005bbf&amp;width=300&amp;dpr=1&amp;quality=100&amp;sign=842a69ffc91ebb5bfef7f66731b2b818c5b2c143f02840511edc368a153e7e69 300w, https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252Fcv1mGoC2T0HJN1QW9pu6%252FScreen%2520Shot%25202022-06-16%2520at%25203.02.58%2520PM.png%3Falt%3Dmedia%26token%3D58f0811f-f96c-4a42-bee2-1b4ed4005bbf&amp;width=300&amp;dpr=2&amp;quality=100&amp;sign=842a69ffc91ebb5bfef7f66731b2b818c5b2c143f02840511edc368a153e7e69 600w, https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252Fcv1mGoC2T0HJN1QW9pu6%252FScreen%2520Shot%25202022-06-16%2520at%25203.02.58%2520PM.png%3Falt%3Dmedia%26token%3D58f0811f-f96c-4a42-bee2-1b4ed4005bbf&amp;width=300&amp;dpr=3&amp;quality=100&amp;sign=842a69ffc91ebb5bfef7f66731b2b818c5b2c143f02840511edc368a153e7e69 900w, https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252Fcv1mGoC2T0HJN1QW9pu6%252FScreen%2520Shot%25202022-06-16%2520at%25203.02.58%2520PM.png%3Falt%3Dmedia%26token%3D58f0811f-f96c-4a42-bee2-1b4ed4005bbf&amp;width=300&amp;dpr=4&amp;quality=100&amp;sign=842a69ffc91ebb5bfef7f66731b2b818c5b2c143f02840511edc368a153e7e69 1200w"
                          sizes="300px"
                          width="2078"
                          height="934"
                        />
                      </span>
                      <p className="italic text-center w-full text-sm">
                        (Personal Settings &gt; Privacy &amp; Safety&gt;Allow
                        direct messages from server members)
                      </p>
                      <strong className="font-bold block text-center w-full my-4">
                        OR
                      </strong>
                      <div className="text-center flex justify-center">
                        <span className="mt-4 block max-w-[300px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt=""
                            loading="lazy"
                            className="inline ZoomImage_zoomImg__teSyL"
                            src="https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252FgdMTdBtiWKMjw9U7r7CN%252Fimage.png%3Falt%3Dmedia%26token%3Da1497d6a-7c0a-4ee2-9ab8-ed5743b08de7&amp;width=300&amp;dpr=4&amp;quality=100&amp;sign=2cfdb2d7f9555f936c36a02a383b059d25744f39e588c2cd30f380753866d00a"
                            srcSet="https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252FgdMTdBtiWKMjw9U7r7CN%252Fimage.png%3Falt%3Dmedia%26token%3Da1497d6a-7c0a-4ee2-9ab8-ed5743b08de7&amp;width=300&amp;dpr=1&amp;quality=100&amp;sign=2cfdb2d7f9555f936c36a02a383b059d25744f39e588c2cd30f380753866d00a 300w, https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252FgdMTdBtiWKMjw9U7r7CN%252Fimage.png%3Falt%3Dmedia%26token%3Da1497d6a-7c0a-4ee2-9ab8-ed5743b08de7&amp;width=300&amp;dpr=2&amp;quality=100&amp;sign=2cfdb2d7f9555f936c36a02a383b059d25744f39e588c2cd30f380753866d00a 600w, https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252FgdMTdBtiWKMjw9U7r7CN%252Fimage.png%3Falt%3Dmedia%26token%3Da1497d6a-7c0a-4ee2-9ab8-ed5743b08de7&amp;width=300&amp;dpr=3&amp;quality=100&amp;sign=2cfdb2d7f9555f936c36a02a383b059d25744f39e588c2cd30f380753866d00a 900w, https://wagmedia.gitbook.io/~gitbook/image?url=https%3A%2F%2F3960028196-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FVFDNowd1Git9AX58VhbF%252Fuploads%252FgdMTdBtiWKMjw9U7r7CN%252Fimage.png%3Falt%3Dmedia%26token%3Da1497d6a-7c0a-4ee2-9ab8-ed5743b08de7&amp;width=300&amp;dpr=4&amp;quality=100&amp;sign=2cfdb2d7f9555f936c36a02a383b059d25744f39e588c2cd30f380753866d00a 1200w"
                            sizes="300px"
                            width="946"
                            height="2048"
                          />
                        </span>
                      </div>
                      <p className="italic text-center w-full text-sm">
                        (Server Settings &gt; Allow Direct Messages)
                      </p>
                    </p>
                  </div>
                </li>
                <li value="3" className="leading-normal">
                  <div
                    data-value="3"
                    className="bullet ListItem_olListItemBullet__9X19L text-base"
                  ></div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <p className="max-w-3xl w-full mx-auto decoration-primary/6 leading-normal min-h-[1lh] flip-heading-hash">
                      React with an emoji on the message in{" "}
                      <span className="text-red-500">
                        <strong className="font-bold">#🪤│front-desk</strong>
                      </span>
                      .{" "}
                    </p>
                  </div>
                </li>
                <li value="4" className="leading-normal">
                  <div
                    data-value="4"
                    className="bullet ListItem_olListItemBullet__9X19L text-base"
                  ></div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <p className="max-w-3xl w-full mx-auto decoration-primary/6 leading-normal min-h-[1lh] flip-heading-hash">
                      The Concierge will DM you. Message him{" "}
                      <i className="font-italic">!wagmi </i>and he offer you
                      options for registering your address or Twitter handle.
                    </p>
                  </div>
                </li>
                <li value="5" className="leading-normal">
                  <div
                    data-value="5"
                    className="bullet ListItem_olListItemBullet__9X19L text-base"
                  ></div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <p className="max-w-3xl w-full mx-auto decoration-primary/6 leading-normal min-h-[1lh] flip-heading-hash">
                      Once you have been verified, introduce yourself in the{" "}
                      <span className="text-red-500">
                        <strong className="font-bold">#New-Here</strong>
                      </span>{" "}
                      channel that will have magically appeared in the discord
                      channel list.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="flex-grow text-right flex justify-right flex-col lg:ml-48 w-full max-w-md">
              <h3 className="text-xl mb-6">
                Watch this Video Tutorial on how to join
              </h3>
              {/* <Image className="w-full" src={rightImg} alt="" /> */}
              <YouTubeEmbedDisplay
                url="https://www.youtube.com/watch?v=zfznEfzjGPA"
                width="100%"
                height="100%"
                style={{ aspectRatio: "16/9" }}
              />

              <h3 className="text-xl mb-6 mt-12">What is WagMedia?</h3>
              <YouTubeEmbedDisplay
                url="https://www.youtube.com/watch?v=MLZmbo-ZsHk"
                width="100%"
                height="100%"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </div>

        <SectionFounder />

        <div className="nc-SectionFounder relative">
          <Heading desc="">💲 Funding History</Heading>
          <div className="">
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
              href="https://polkadot.subsquare.io/referenda/365"
              rel="nofollow"
            >
              Polkadot OpenGov Referendum 365
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageAbout
