'use client'

import { CreateComment } from "@/app/action";
import { useActionState } from "react";

export const CreateCommentComponent = ({ idQuestion, token }: { idQuestion: string, token: boolean }) => {
  const [state, action, pending] = useActionState(CreateComment, {
    ok: false,
    error: '',
    data: null,
  })


  return (
    <form action={action} className="mt-2">
      <input type="hidden" name="postId" defaultValue={idQuestion} />
      <textarea
        placeholder="Comentar..."
        name="content"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {token ? (
        <button
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-400"
          disabled={pending}
        >
          Adicionar comentário
        </button>
      ) : (
        <button
          disabled={true}
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-400"
        >
          Adicionar comentário
        </button>
      )}
      <span className="w-96 max-md:w-80 mt-2 text-justify flex flex-row items-center text-red-600 text-xs">
        {state.ok === false && state.error && state.error}
      </span>
    </form>
  )
}