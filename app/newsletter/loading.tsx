import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import Heading from "@/components/Heading/Heading"
import SectionMagazine7 from "@/components/Sections/SectionMagazine7"

import { SinglePostSkeleton } from "../post/[slug]/SinglePostSkeleton"

export default function Loading() {
  return (
    <div className="container relative py-8 lg:py-16">
      <Heading desc="🎉 Catch up on the latest updates as well as our captivating stories.">
        WagMedia Newsletter
      </Heading>
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        <PostGridSkeleton cols={2} />
      </div>
    </div>
  )
}
