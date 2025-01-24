import { GetUserByThreads, ProfileUser } from "@/app/action";
import { CreateCommentComponent } from "@/components/thread/createComment";
import { DropdownMenuThreads } from "@/components/nav/dropdownMenuThreads";
import { DropdownMenuComment } from "@/components/nav/dropdownMenuComment";
import { cookies } from "next/headers";
import { ThreadInterface } from "../(home)/page";

export default async function ThreadsUserProfile() {
  const questions = (await GetUserByThreads()) as ThreadInterface[];

  const cookistore = await cookies()
  const token = cookistore.get('token')?.value

  const profile = await ProfileUser()

  return (
    <div className="bg-forum-gradient-2 w-full min-h-screen flex flex-col items-center py-10">
      {questions.length > 0 && (
        <h1 className="text-4xl font-bold text-white mb-6">
          Forum Questions of {questions[0].author.nickname}
        </h1>
      )}
      <div className="flex flex-col gap-6 w-full max-w-3xl px-4">
        {questions &&
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
                          <strong>{comment.author?.nickname || "Anonymous"}:</strong>{" "}
                          {comment.content}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              <CreateCommentComponent idQuestion={q.id} token={token ? true : false} />
            </div>
          ))}
      </div>
    </div>
  );
}
