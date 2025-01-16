import { FetchRecentThreads, FetchSearchThreads, ProfileUser } from "@/app/action";
import { DropdownMenuComment } from "@/components/header/dropdownMenuComment";
import { DropdownMenuThreads } from "@/components/header/dropdownMenuThreads";
import { CreateCommentComponent } from "@/components/thread/createComment";
import { cookies } from "next/headers";
import Link from "next/link";

export interface ThreadInterface {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    nickname: string;
  };
  comments: {
    id: string;
    content: string;
    author: {
      id: string;
      nickname: string;
    };
    createdAt: Date;
  }[];
}

interface SearchParamsProps {
  searchParams: {
    page: number;
    query: string;
  };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const { page = 1, query } = await searchParams;

  let questions = [];

  if (query) questions = (await FetchSearchThreads(query, page)) as ThreadInterface[];
  else questions = (await FetchRecentThreads(page)) as ThreadInterface[];

  const cookistore = await cookies()
  const token = cookistore.get('token')?.value

  const user = await ProfileUser()

  return (
    <div className="bg-forum-gradient-2 w-full min-h-screen flex flex-col items-center py-10">
      {token && (
        <div className="mt-6">
          <Link href="/threads/new">
            <p className="bg-forum-gradient-3 bg-clip-text text-transparent cursor-pointer">
              Start a new thread
            </p>
          </Link>
        </div>
      )}
      <h1 className="text-4xl font-bold text-white mb-6">Forum Questions</h1>

      {query && (
        <div className="mb-4">
          <Link href="/threads">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
              Voltar para todas as questões
            </button>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-6 w-full max-w-3xl px-4">
        {questions &&
          questions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col relative"
            >
              {user && user.id === q.author.id && (
                <div className="absolute top-4 right-4">
                  <DropdownMenuThreads questionId={q.id} />
                </div>
              )}
              <Link
                href={`/threads/profile/${q.author.id}`}
                className="text-lg font-semibold text-gray-800 mb-2"
              >
                {q.author.nickname}
              </Link>
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
                        {user && user.id === comment.author.id && (
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
