import { Skeleton } from "@/components/ui/skeleton"

import SingleTitle from "../SingleTitle"

export async function SinglePostSkeleton({ title }: { title: string }) {
  return (
    <div className={`nc-PageSingle pt-8 lg:pt-16`}>
      <article className={`nc-PageSingle pt-8 lg:pt-16 space-y-10`}>
        <header className="rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <div className={`nc-SingleHeader`}>
              <div className="space-y-5">
                <div className="flex">
                  <Skeleton className="w-20 h-6 rounded-full mr-3" />
                  <Skeleton className="w-20 h-6 rounded-full" />
                </div>
                <SingleTitle title={title} />

                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
              </div>
            </div>
          </div>
        </header>
        <div
          id="w"
          className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          // ref={contentRef}
        >
          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <div className="h-48"></div>
        </div>
      </article>
    </div>
  )
}
