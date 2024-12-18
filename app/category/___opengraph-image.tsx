import { ImageResponse } from "next/og"

import { deslugify } from "@/lib/slug"
import OpengraphImage from "@/components/opengraph-image"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Wagmedia"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  return OpengraphImage({ title: deslugify(params.slug) })
}
