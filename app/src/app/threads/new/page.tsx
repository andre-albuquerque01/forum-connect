import CreateThreadNewComponent from "@/components/thread/create-thread";

export default function ThreadNew() {
  return (
    <div className="bg-forum-gradient-2 w-full h-[calc(100vh-64px)] flex flex-col items-center py-10">
      <CreateThreadNewComponent />
    </div>
  )
}
