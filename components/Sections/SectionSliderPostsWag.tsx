"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types";
import Card9 from "@/components/Card9/Card9";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card10V2 from "@/components/Card10/Card10V2";
import MySlider from "@/components/MySlider";
import { CardPost } from "../CardPost/CardPost";
import Card11Wag from "../Card11/Card11Wag";

export interface SectionSliderPostsWagProps {
  className?: string;
  heading: string;
  subHeading?: string;
  posts: PostWithTagsCategoriesReactionsPaymentsUser[];
  postCardName?: "card4" | "card7" | "card9" | "card10" | "card10V2" | "card11";
  perView?: 2 | 3 | 4;
}

const SectionSliderPostsWag: FC<SectionSliderPostsWagProps> = ({
  heading,
  subHeading,
  className = "",
  posts,
  postCardName = "card11",
  perView = 3,
}) => {
  let CardComponent = Card11;

  switch (postCardName) {
    case "card4":
      CardComponent = Card4;
      break;
    case "card7":
      CardComponent = Card7;
      break;
    case "card9":
      CardComponent = Card9;
      break;
    case "card10":
      CardComponent = Card10;
      break;
    case "card10V2":
      CardComponent = Card10V2;
      break;
    case "card11":
      CardComponent = Card11;
      break;

    default:
      break;
  }

  return (
    <div className={`nc-SectionSliderPostsWag py-8 ${className}`}>
      <MySlider
        data={posts}
        renderItem={(item, indx) => <Card11Wag key={indx} post={item} />}
        itemPerRow={perView}
      />
    </div>
  );
};

export default SectionSliderPostsWag;
