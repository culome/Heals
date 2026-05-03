import { Feather } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { TimelinePost } from "@/components/timeline-post"
import { posts } from "@/lib/posts"

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-10 -mx-4 border-b border-border/70 bg-background/85 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm">
                <Feather className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-semibold leading-6 tracking-normal">
                  Heals Timeline
                </h1>
                <p className="truncate text-sm leading-5 text-muted-foreground">
                  生活、前端与一些安静的想法
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <section className="py-8 sm:py-10">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Timeline
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-normal sm:text-3xl">
                最近的记录
              </h2>
            </div>
            <p className="shrink-0 text-sm text-muted-foreground">
              {posts.length} 篇
            </p>
          </div>

          <Separator className="mb-6" />

          <div className="space-y-5">
            {posts.map((post) => (
              <TimelinePost key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
