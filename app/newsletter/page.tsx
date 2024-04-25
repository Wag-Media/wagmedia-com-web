import {
  getCategories,
  getCategoriesWithPosts,
  getNonEnglishCategories,
} from "@/data/dbCategories"
import { getNewsletterPosts } from "@/data/dbPosts"

import PostGrid from "@/components/ui/post-grid/PostGrid"
import Heading from "@/components/Heading/Heading"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"
import SectionMagazine7 from "@/components/Sections/SectionMagazine7"
import SectionMagazine11Wag from "@/components/Sections/SectionMagazine11Wag"
import { Newsletter } from "@/components/newsletter/newsletter"

export default async function PageCategories() {
  const posts = await getNewsletterPosts()

  return (
    <div className="container relative py-16 lg:py-24">
      <Heading
        className="max-w-xl"
        desc="🎉 With the WagMedia Newsletter you will get the latest news and updates on Polkadot directly to your inbox."
      >
        WagMedia Newsletter
      </Heading>

      <SectionMagazine7 posts={posts} />

      <div className="container ">
        <SectionSubscribe2 className="pt-16 lg:pt-28" />
      </div>
    </div>
  )
}
