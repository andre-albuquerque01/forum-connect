import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-forum-gradient-2 w-full h-screen flex items-center justify-center">
      <div className="max-w-[1200px] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to the Forum!</h1>
        <p className="text-xl text-white mb-4">
          Share your thoughts, ask questions, and connect with others.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[600px]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            How does the React useState hook work?
          </h2>
          <p className="text-gray-600 mb-4">
            The `useState` hook is a function that allows you to manage state in a functional React component. It returns an array with two elements: the current state and a function to update it.
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Asked by: <strong>John Doe</strong></span>
            <span>2 answers</span>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <Link href="/threads/new">
            <p className="text-blue-500 hover:text-blue-400 cursor-pointer">
              Start a new thread
            </p>
          </Link>
          <Link href="/threads">
            <p className="text-blue-500 hover:text-blue-400 cursor-pointer">
              Browse threads
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
