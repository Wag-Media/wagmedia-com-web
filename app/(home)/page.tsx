import React from "react";
import SectionLargeSlider from "@/app/(home)/SectionLargeSlider";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "@/data/posts";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { DEMO_AUTHORS } from "@/data/authors";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionMagazine1 from "@/components/Sections/SectionMagazine1";
import SectionAds from "@/components/Sections/SectionAds";
import SectionMagazine7 from "@/components/Sections/SectionMagazine7";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import SectionVideos from "@/components/Sections/SectionVideos";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
import SectionMagazine2 from "@/components/Sections/SectionMagazine2";
import { getFeaturedPosts, getPosts } from "@/data/dbPosts";
import SectionLatestWagPosts from "@/components/Sections/SectionLatestPostsWag";
import SectionGridWagPosts from "@/components/Sections/SectionGridWagPosts";
import SectionHero from "@/components/SectionHero/SectionHero";
import rightImg from "@/images/hero-right.png";
import Vector1 from "@/images/Vector1.png";
import Image from "next/image";
import SectionSliderPostsWag from "@/components/Sections/SectionSliderPostsWag";
import { cn } from "@/utils/cn";
import HeaderFilter from "@/components/Sections/HeaderFilter";

const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);

const PageHome = async ({}) => {
  const posts = await getPosts();
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="nc-PageHome relative">
      <div className="">
        {/* <div className="pt-10 md:py-16 lg:pt-20 flex flex-col md:flex-row !overflow-hidden"> */}
        {/* <div
            className={cn(
              "w-full md:w-2/5 z-10 backdrop-blur-lg bg-white/50 dark:dark:bg-neutral-900/50",
              "flex justify-center flex-col"
            )}
            style={{
              paddingLeft: "max(0px, calc((100vw - 1280px) / 2))",
            }}
          >
            <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
              Decentralized
              <br />
              Media,
              <br />
              Collective
              <br />
              Impact
            </h2>
            <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
              Shaping the Future of Blockchain Media Creation
            </span>
          </div>
          <div
            className="w-full md:w-3/5 pl-8"
            style={{
              paddingRight: "max(0px, calc((100vw - 1280px) / 2))",
            }}
          >
            <SectionSliderPostsWag
              postCardName="card11"
              heading="Prominent Posts"
              // subHeading="Over 218 articles about sea travel"
              posts={MAGAZINE2_POSTS.filter((_, i) => i < 8)}
            />
          </div> */}
        {/* </div> */}
        <div className="relative container">
          <div
            className={cn(
              "w-full z-10 backdrop-blur-lg bg-white/50 dark:dark:bg-neutral-900/50 py-12",
              "flex justify-center flex-col text-center"
            )}
          >
            <h2 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-600 mb-4 leading-tight">
              Decentralized Media,
              <br />
              Collective Impact
            </h2>
            <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
              WagMedia is shaping the Future of Blockchain Media Creation
            </span>
          </div>
          <SectionSliderPostsWag
            postCardName="card11"
            heading="Prominent Posts"
            posts={featuredPosts}
          />
          {/* <SectionHero
            rightImg={rightImg}
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
            heading={
              <span>
                Decentralized Media, Collective Impact
                <span className="relative pr-3">
                  <Image
                    className="w-full absolute top-1/2 -start-1 transform -translate-y-1/2"
                    src={Vector1}
                    alt=""
                  />
                  <span className="relative">heart</span>
                </span>
              </span>
            }
            // btnText="Getting started"
            subHeading="Shaping the Future of Blockchain Media Creation"
          /> */}

          <SectionGridWagPosts
            className="pb-16 lg:pb-28 pt-16"
            postCardName="card11"
            heading="Explore our latest posts"
            subHeading="Discover 1129 Polkadot related posts"
            posts={posts}
            gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          />
        </div>
      </div>

      <div className="container relative">
        {/* <SectionLargeSlider
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          posts={DEMO_POSTS?.filter((_, i) => i < 3)}
        /> */}

        <SectionLatestWagPosts className="pb-16 lg:pb-28" posts={posts} />

        <SectionMagazine1 className="py-16 lg:py-28" posts={MAGAZINE1_POSTS} />

        <div className="relative pb-16">
          <BackgroundSection />
          <SectionGridAuthorBox
            className="py-8 lg:py-16"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />
        </div>

        {/* <SectionSliderNewCategories
          className="py-16 lg:py-28"
          heading="Top trending topics"
          subHeading="Discover 233 topics"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        /> */}

        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Explore latest audio articles"
            subHeading="Click on the icon to enjoy the music or podcast 🎧"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
          />
        </div> */}

        {/* <SectionAds /> */}

        {/* <SectionMagazine7
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
        /> */}
      </div>

      {/* <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
        <div className="relative container">
          <SectionGridPosts
            className="py-16 lg:py-28"
            headingIsCenter
            postCardName="card10V2"
            heading="Explore latest video articles"
            subHeading="Hover on the post card and preview video 🥡"
            posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
            gridClass="md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </div> */}

      <div className="container ">
        {/* <SectionMagazine8
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
        /> */}

        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine9
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 15)}
          />
        </div> */}

        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionMagazine2
          className="py-16 lg:py-24"
          heading="Life styles 🎨 "
          posts={MAGAZINE2_POSTS}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card11"
            heading="More design articles"
            subHeading="Over 1118 articles "
            posts={DEMO_POSTS.filter(
              (p, i) => i > 3 && i < 25 && p.postType === "standard"
            )}
          />
        </div>

        <SectionSubscribe2 className="pt-16 lg:pt-28" />

        <SectionVideos className="py-16 lg:py-28" />
      </div>
    </div>
  );
};

export default PageHome;
