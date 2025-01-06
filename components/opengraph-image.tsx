import { ImageResponse } from "next/og"

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
export default async function OpengraphImage({
  title,
  subtitle,
  style,
}: {
  title: string
  subtitle: string
  style?: React.CSSProperties
}) {
  // Font

  const url = new URL("../fonts/Inter-Bold.ttf", import.meta.url)
  const interBold = fetch(url).then((res) => res.arrayBuffer())

  const logoSrc = await fetch(
    new URL("../public/wagmedia-logo.png", import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          ...{
            fontSize: 128,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: 20,
          },
          ...style,
        }}
      >
        {title}
        <div style={{ fontSize: 32 }}>{subtitle}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            height: "80px",
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
          alt="Wagmedia Logo"
          src={logoSrc as unknown as string}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  )
}
