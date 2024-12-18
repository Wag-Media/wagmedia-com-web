import { ImageResponse } from "next/og"
import { getAuthorPostCount } from "@/data/dbPosts"

import OpengraphImage from "@/components/opengraph-image"

import { deslugify } from "../../../lib/slug"

export const runtime = "edge"

export default async function Image({ params }: { params: { slug: string } }) {
  return await OpengraphImage({
    title: deslugify(params.slug),
    subtitle: "WagMedia Content Category",
    style: {
      background: "#FF2670",
    },
  })
}
