import { ImageResponse } from "next/og"
import { getAuthorPostCount } from "@/data/dbPosts"

import OpengraphImage from "@/components/opengraph-image"

export const runtime = "edge"

export default async function Image({ params }: { params: { name: string } }) {
  return await OpengraphImage({
    title: params.name,
    subtitle: "WagMedia Creator",
  })
}

