import Image from "next/image"

export function WagImage({
  image,
  containerClassName = "",
  ...props
}: {
  image: string | undefined | null
  [key: string]: any
}) {
  if (!image) return null

  if (image.includes("discordapp")) {
    return (
      <div className={containerClassName}>
        <Image
          fill
          src={image}
          sizes="(max-width: 600px) 480px, 800px"
          alt={props.alt}
          {...props}
        />
      </div>
    )
  } else {
    return (
      <div className={containerClassName}>
        <img
          src={image}
          alt={props.alt}
          className="absolute object-contain w-full h-full backdrop-blur-lg "
          sizes="(max-width: 600px) 480px, 800px"
          {...props}
        />
      </div>
    )
  }
}
