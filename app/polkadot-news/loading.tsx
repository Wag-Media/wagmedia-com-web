import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import Heading from "@/components/Heading/Heading"

export default function Loading() {
  return (
    <div className="container relative py-8 lg:py-16">
      <Heading desc="All the Polkadot News Uncovered by our Finders Program">
        Explore all Polkadot News Categories
      </Heading>
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        <PostGridSkeleton cols={3} />
      </div>
    </div>
  )
}
