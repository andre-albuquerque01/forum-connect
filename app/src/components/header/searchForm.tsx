'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'
import { LuSearch } from 'react-icons/lu'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) return null

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-200 px-5 py-3 ring-zinc-300"
    >
      <LuSearch className="w-5 h-5 text-zinc-500" />
      <input
        name="q"
        placeholder="Buscar questões..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        defaultValue={query ?? ''}
        required
      />
    </form>
  )
}