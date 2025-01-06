import { ImageResponse } from "next/og"
import { getAuthorPostCount } from "@/data/dbPosts"

import { deslugify } from "@/lib/slug"
import OpengraphImage from "@/components/opengraph-image"

export const runtime = "edge"

export default async function Image({ params }: { params: { slug: string } }) {
  // trim the timestamp from the slug
  const slug = params.slug.split("-").slice(0, -1).join("-")

  return await OpengraphImage({
    title: deslugify(slug),
    subtitle: "WagMedia Polkadot Post",
    style: {
      background: "#FF2670",
      fontSize: 80,
    },
  })
}
