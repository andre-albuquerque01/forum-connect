'use client'
import { CreateThread } from "@/app/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { GoBack } from "../nav/goBack";

export default function CreateThreadNewComponent() {
  const [state, action, pending] = useActionState(CreateThread, {
    ok: false,
    error: '',
    data: null,
  })
  const router = useRouter()

  useEffect(() => {
    if (state.ok) {
      alert('Questão publicada!')
      router.back()
    }
  }, [state, router]);

  return (
    <div className="bg-forum-gradient-2 w-full min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-white mb-6">New Questions</h1>
      <form action={action} className="flex flex-col gap-6 w-full max-w-2xl px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <GoBack />
          <input type="text" name="title" placeholder="Título" className="border p-2 rounded-md mb-4" required />
          <textarea name="content" className="text-gray-600 border p-2 rounded-md mb-4" required></textarea>
          <button className="bg-forum-gradient-4 text-white p-2 rounded-md hover:bg-green-500" disabled={pending}>Enviar</button>
          <span className="w-96 max-md:w-80 text-justify flex flex-row items-center text-red-600 text-xs">
            {state.error && state.error}
          </span>
        </div>
      </form>
    </div>
  );
}
