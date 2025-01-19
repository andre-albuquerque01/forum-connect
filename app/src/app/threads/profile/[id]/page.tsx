import { ProfileUser, SearchUserByThreads } from "@/app/action";
import { CreateCommentComponent } from "@/components/thread/createComment";
import { ThreadInterface } from "../../(home)/page";
import { DropdownMenuThreads } from "@/components/nav/dropdownMenuThreads";
import { DropdownMenuComment } from "@/components/nav/dropdownMenuComment";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Profile({ params }: { params: { id: string } }) {
  const user = await params

  const questions = (await SearchUserByThreads(user.id)) as ThreadInterface[];

  const cookistore = await cookies()
  const token = cookistore.get('token')?.value

  const profile = await ProfileUser()

  return (
    <div className="bg-forum-gradient-2 w-full min-h-[calc(100vh-64px)] flex flex-col items-center py-10">
      {questions.length > 0 && (
        <h1 className="text-4xl font-bold text-white mb-6">
          Forum Questions of {questions[0].author.nickname}
        </h1>
      )}
      <div className="mb-4">
        <Link href="/threads">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            Voltar para todas as questões
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-3xl px-4">
        {questions &&
          questions.length > 0 ?
          questions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col relative"
            >
              {profile && profile.id === q.author.id && (
                <div className="absolute top-4 right-4">
                  <DropdownMenuThreads questionId={q.id} />
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {q.author.nickname}
              </h2>
              <p className="text-gray-600 font-semibold">{q.title}</p>
              <p className="text-gray-600 mb-4">{q.content}</p>
              <div className="text-sm text-gray-500 ">
                <strong>Comentários:</strong>
                <ul className="mt-2 space-y-2 ">
                  {q.comments &&
                    q.comments.map((comment, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 p-2 rounded-md text-gray-700 w-full break-words relative"
                      >
                        {profile && profile.id === comment.author.id && (
                          <div className="absolute top-2 right-4">
                            <DropdownMenuComment commentId={comment.id} />
                          </div>
                        )}
                        <p>
                          <Link
                            href={`/threads/profile/${comment.author.id}`}
                            className="text-sm font-semibold text-gray-800 mb-2"
                          >
                            {comment.author?.nickname || "Anonymous"}: {' '}
                          </Link>
                          {comment.content}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              <CreateCommentComponent idQuestion={q.id} token={token ? true : false} />
            </div>
          )) : (
            <p className="text-4xl font-bold text-white mb-6">
              Não há questões publicadas pelo usuário
            </p>
          )}
      </div>
    </div>
  );
}
