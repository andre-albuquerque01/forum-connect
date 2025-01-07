export const CreateComment = () => {
    return (
        <div className="mt-4">
            <input
                type="text"
                // value={newComment}
                // onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                // onClick={() => addComment(q.id)}
                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-400"
            >
                Add Comment
            </button>
        </div>
    )
}