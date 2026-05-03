import ReactMarkdown from "react-markdown"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/lib/posts"

const formatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

type TimelinePostProps = {
  post: Post
}

export function TimelinePost({ post }: TimelinePostProps) {
  const displayDate = formatter.format(new Date(`${post.date}T00:00:00`))

  return (
    <article className="relative pl-12 sm:pl-16">
      <div className="absolute left-[19px] top-12 h-[calc(100%+1.25rem)] w-px bg-border sm:left-[23px]" />
      <Avatar className="absolute left-0 top-1 h-10 w-10 border border-border bg-background shadow-sm sm:h-12 sm:w-12">
        <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
          H
        </AvatarFallback>
      </Avatar>

      <Card className="rounded-lg border-border/80 bg-card/80 shadow-none backdrop-blur">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Heals</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{displayDate}</time>
          </div>

          <h2 className="mt-3 text-xl font-semibold leading-snug tracking-normal text-foreground sm:text-2xl">
            {post.title}
          </h2>

          {post.excerpt ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              {post.excerpt}
            </p>
          ) : null}

          {post.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  #{tag}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="prose prose-neutral mt-5 max-w-none dark:prose-invert prose-p:leading-7 prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-4">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}
