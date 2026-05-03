import rawPosts from "@/content/posts.md?raw"

export type Post = {
  id: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
  body: string
}

type PostFrontmatter = {
  id?: string
  title?: string
  date?: string
  tags?: string[]
  excerpt?: string
}

function parseTags(value: string | undefined): string[] {
  if (!value) {
    return []
  }

  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function parseFrontmatter(frontmatter: string): PostFrontmatter {
  return frontmatter.split("\n").reduce<PostFrontmatter>((data, line) => {
    const separatorIndex = line.indexOf(":")

    if (separatorIndex === -1) {
      return data
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (key === "tags") {
      data.tags = parseTags(value)
      return data
    }

    if (
      key === "id" ||
      key === "title" ||
      key === "date" ||
      key === "excerpt"
    ) {
      data[key] = value
    }

    return data
  }, {})
}

function splitFrontmatter(entry: string, index: number) {
  const match = entry.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`Post ${index + 1} is missing frontmatter delimiters.`)
  }

  return {
    data: parseFrontmatter(match[1]),
    body: match[2].trim(),
  }
}

function requireString(value: string | undefined, field: string, index: number) {
  if (!value || value.trim().length === 0) {
    throw new Error(`Post ${index + 1} is missing a valid "${field}" value.`)
  }

  return value.trim()
}

export function parsePosts(source = rawPosts): Post[] {
  return source
    .split(/^---post\s*$/m)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry, index) => {
      const parsed = splitFrontmatter(entry, index)
      const data = parsed.data

      return {
        id: requireString(data.id, "id", index),
        title: requireString(data.title, "title", index),
        date: requireString(data.date, "date", index),
        tags: data.tags ?? [],
        excerpt: data.excerpt?.trim() ? data.excerpt.trim() : undefined,
        body: parsed.body,
      }
    })
    .sort(
      (a, b) =>
        new Date(`${b.date}T00:00:00`).getTime() -
        new Date(`${a.date}T00:00:00`).getTime(),
    )
}

export const posts = parsePosts()
