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

  const meshSrc = await fetch(
    new URL("../public/mesh-360.png", import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          ...{
            fontSize: 110,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 20,
            textAlign: "center",
            color: "white",
            background:
              "radial-gradient(circle at 120% 30%, #f0ff23, #ffea00, #ffd400, #ffbd13, #ffa62a, #ff8e3c, #ff754e, #ff5c5e, #ff436e, #ff2a7e, #fd118d, #e9009b)",
          },
          ...style,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          alt="Mesh"
          src={meshSrc as unknown as string}
        />
        <div>{title}</div>
        <div style={{ fontSize: 32 }}>{subtitle}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            height: "100px",
            position: "absolute",
            bottom: 40,
            right: 40,
          }}
          alt="Wagmedia Logo"
          src={logoSrc as unknown as string}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
