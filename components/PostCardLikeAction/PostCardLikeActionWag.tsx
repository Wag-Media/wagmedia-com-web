"use client";

import React, { FC, useState } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { Smile, SmilePlus } from "lucide-react";

export interface PostCardLikeActionWagProps {
  className?: string;
  likeCount?: number;
  liked?: boolean;
}

const PostCardLikeActionWag: FC<PostCardLikeActionWagProps> = ({
  className = "px-3 h-8 text-xs",
  likeCount = 12,
  liked = false,
}) => {
  const [isLiked, setisLiked] = useState(liked);

  return (
    <button
      className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors ${className} ${
        isLiked
          ? "text-rose-600 bg-rose-50 dark:bg-rose-100"
          : "text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500"
      }`}
      onClick={() => setisLiked(!isLiked)}
      title="Liked"
    >
      <Smile size={20} strokeWidth={2} />

      {likeCount && (
        <span
          className={`ml-1 ${
            isLiked ? "text-rose-600" : "text-neutral-900 dark:text-neutral-200"
          }`}
        >
          {convertNumbThousand(isLiked ? likeCount + 1 : likeCount)}
        </span>
      )}
    </button>
  );
};

export default PostCardLikeActionWag;
