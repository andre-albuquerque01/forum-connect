'use client'
import Form from 'next/form'
import { LuSearch } from 'react-icons/lu'

export default function SearchForm() {
  // const router = useRouter()
  // const searchParams = useSearchParams()

  // const query = searchParams.get('q') || ''

  // function handleSearch(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault()

  //   const formData = new FormData(e.currentTarget)
  //   const { q } = Object.fromEntries(formData) as { q: string }

  //   if (!q.trim()) return

  //   router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  // }

  return (
    <Form
      action='/threads'
      className="flex w-[320px] max-md:w-56 items-center gap-3 rounded-full bg-zinc-200 px-5 py-3 ring-zinc-300"
    >
      <button>
        <LuSearch className="w-5 h-5 text-zinc-500" />
      </button>
      <input
        name="query"
        placeholder="Buscar questões..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        required
      />
    </Form>
  )
}
