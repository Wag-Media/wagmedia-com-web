import Image from "next/image"
import Link from "next/link"
import { DollarSign, MessageCircleHeart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PostDisplayType } from "@/components/FeaturedPostsSlider"

export const LatestArticlesCard = ({
  article,
}: {
  article: PostDisplayType
}) => {
  return (
    <Card
      key={article.id}
      className="relative overflow-hidden transition-all duration-300 rounded-sm hover:shadow-lg hover:scale-[1.02] hover:cursor-pointer"
    >
      <CardContent className="flex flex-col h-full p-0">
        <div className="relative aspect-[4/3]">
          <div className="absolute flex flex-wrap gap-2 mb-2 top-2 left-2">
            {article.categories.slice(0, 3).map((cat, index) => (
              <Link href={`/category/${cat.slug}`} key={index}>
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 hover:bg-[#FF2670] hover:text-white font-sans"
                >
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="object-cover w-full h-full"
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col flex-1 p-4">
          <h3 className="mb-2 font-medium leading-tight text-gray-900 dark:text-white line-clamp-2 font-unbounded">
            {article.title}
          </h3>
          <p className="flex-1 mb-4 text-sm text-gray-600 dark:text-slate-300 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mb-2 text-sm">
            <div className="flex items-center gap-2 font-sans text-gray-500 dark:text-slate-300">
              {article.author?.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name || ""}
                  className="w-5 h-5 rounded-full"
                />
              ) : null}
              {article.author?.name}
            </div>
            <time className="font-sans text-gray-500 dark:text-slate-300">
              {article.date}
            </time>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 space-x-2 text-sm text-gray-500 dark:text-slate-300">
              <MessageCircleHeart size={20} strokeWidth={2} color="#999" />5
            </div>
            {/* <div className="flex items-center space-x-2">
              {article.reactions.map((reaction, index) => (
                <span
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  {reaction.emoji}
                  <span className="ml-1 font-sans">{reaction.count}</span>
                </span>
              ))}
            </div> */}
            <span className="flex items-center text-sm font-medium text-[#FF2670] dark:text-pink-400 font-sans">
              <DollarSign className="w-4 h-4 mr-1" />
              {article.fundsReceived}
            </span>
          </div>
        </div>
      </CardContent>
      {/* <Link href={`/post/${article.slug}`} className="absolute inset-0"></Link> */}
    </Card>
  )
}
