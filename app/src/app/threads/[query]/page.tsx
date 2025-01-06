'use client'
import { useState } from "react";
import Link from "next/link";
import { CreateComment } from "@/components/thread/createComment";

export default function ThreadQuery({params}: {params :{ query: string}}) {
  const questions = ([
    {
      id: 1,
      user: "John Doe",
      question: "How does the React useState hook work?",
      comments: ["The `useState` hook allows managing state in a functional component."],
    },
    {
      id: 2,
      user: "Jane Smith",
      question: "What is the difference between let, var, and const in JavaScript?",
      comments: ["`const` is for constants, `let` is block-scoped, and `var` is function-scoped."],
    },
    {
      id: 3,
      user: "Alice Johnson",
      question: "How do I center a div in CSS?",
      comments: ["You can use flexbox with `justify-content` and `align-items` set to `center`."],
    },
  ]);

  return (
    <div className="bg-forum-gradient-2 w-full min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-white mb-6">Forum Questions</h1>
      <div className="flex flex-col gap-6 w-full max-w-2xl px-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {q.user}
            </h2>
            <p className="text-gray-600 mb-4">{q.question}</p>
            <div className="text-sm text-gray-500 mb-4">
              <strong>Comments:</strong>
              <ul className="mt-2 space-y-2">
                {q.comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 rounded-md text-gray-700"
                  >
                    {comment}
                  </li>
                ))}
              </ul>
            </div>
           <CreateComment />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/threads/new">
          <p className="text-blue-500 hover:text-blue-400 cursor-pointer">
            Start a new thread
          </p>
        </Link>
      </div>
    </div>
  );
}
