import Heading from "@/components/Heading/Heading"

export default function Loading() {
  return (
    <div className="container relative py-16 lg:py-24">
      <Heading
        className="max-w-xl"
        desc="🎉 Thanks for reading WagMedia Weekly! Subscribe for free to receive new posts and support our work."
      >
        WagMedia Newsletter
      </Heading>
      Loading...
    </div>
  )
}
