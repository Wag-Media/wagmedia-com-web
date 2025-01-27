"use client"

import { Embed } from "@prisma/client"
import {
  InstagramEmbed,
  TikTokEmbed,
  YouTubeEmbed,
} from "react-social-media-embed"
import { Tweet } from "react-tweet"

import { getEmbedType } from "./util"

export function SinglePostEmbeds({ embeds }: { embeds: Embed[] }) {
  return (
    <div className="overflow-hidden nc-SinglePostEmbeds">
      {embeds.map((embed, index) => {
        const embedType = getEmbedType(embed.embedUrl)

        if (embedType === "twitter") {
          const tweetId = embed.embedUrl?.split("/").pop()

          return (
            <div
              key={index}
              className="flex justify-center nc-SinglePostEmbeds__twitter"
            >
              {tweetId && <Tweet id={tweetId} />}
            </div>
          )
        }

        if (embedType === "youtube" && embed.embedUrl) {
          return (
            <div
              key={index}
              className="overflow-hidden nc-SinglePostEmbeds__youtube rounded-xl aspect-w-16 aspect-h-9"
            >
              <YouTubeEmbed
                url={embed.embedUrl}
                width="100%"
                height="100%"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          )
        }

        if (embedType === "instagram" && embed.embedUrl) {
          return (
            <div
              key={index}
              className="w-full overflow-hidden nc-SinglePostEmbeds__instagram"
            >
              <InstagramEmbed
                url={embed.embedUrl}
                width="100%"
                style={{ maxWidth: "600px" }}
              />
            </div>
          )
        }

        if (embedType === "tiktok" && embed.embedUrl) {
          return (
            <div
              key={index}
              className="w-full overflow-hidden nc-SinglePostEmbeds__tiktok"
            >
              <TikTokEmbed
                url={embed.embedUrl}
                width="100%"
                style={{ maxWidth: "600px" }}
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
