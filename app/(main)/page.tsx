import type { SearchParams } from "nuqs/server"
import { loadSearchParams } from "@/components/search-params"

type PageProps = {
  searchParams: Promise<SearchParams>
}
export default function HomePage({ searchParams }: PageProps) {
  // The promise itself can be passed to a child component or can be awaited in this page as well
  const loadedSearchParams = loadSearchParams(searchParams)
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is the homepage.</p>
    </div>
  )
}
