'use client'

import { UpdateThread } from "@/app/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoBack } from "../nav/goBack";

export default function UpdateThreadComponent({ id, title, content }: { id: string, title: string, content: string }) {
  const [error, setError] = useState<string>()
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = {
      id: formData.get("id"),
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const result = await UpdateThread(userData);
    if (result === 'success') {
      alert("Questão atualizada com sucesso!");
      router.back();
    } else {
      setError(result);
    }
  };

  return (
    <div className="bg-forum-gradient-2 w-full min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-white mb-6">Update Questions</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-2xl px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <GoBack />
          <input type="hidden" name="id" defaultValue={id} required />
          <input type="text" name="title" placeholder="Título" className="border p-2 rounded-md mb-4 mt-4" defaultValue={title ?? ''} required />
          <textarea name="content" className="text-gray-600 border p-2 rounded-md mb-4" defaultValue={content ?? ''} required></textarea>
          <button className="bg-forum-gradient-4 text-white p-2 rounded-md hover:bg-green-500">Alterar</button>
          <span className="w-96 max-md:w-80 text-justify flex flex-row items-center text-red-600 text-xs">
            {error && error}
          </span>
        </div>
      </form>
    </div>
  );
}
