import { getNewsletterPosts } from "@/data/dbPosts"

import Heading from "@/components/Heading/Heading"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"
import SectionMagazine7 from "@/components/Sections/SectionMagazine7"

export const metadata = {
  title: "WagMedia Newsletter",
  description:
    "🎉 Thanks for reading WagMedia Weekly! Subscribe for free to receive new posts and support our work.",
}

export default async function PageCategories() {
  const posts = await getNewsletterPosts()

  return (
    <div className="container relative py-8 lg:py-16">
      <Heading desc="🎉 Catch up on the latest updates as well as our captivating stories.">
        WagMedia Newsletter
      </Heading>

      <SectionMagazine7 posts={posts} />

      <div className="container ">
        <SectionSubscribe2 className="pt-16 lg:pt-28" />
      </div>
    </div>
  )
}
