import { GetByIdThread } from "@/app/action";
import UpdateThreadComponent from "@/components/thread/update-thread";


export default async function ThreadUpdate({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { title, content } = await GetByIdThread(id);

  return (
    <div className="bg-forum-gradient-2 w-full min-h-screen flex flex-col items-center py-10">
      <UpdateThreadComponent id={id} title={title} content={content} />
    </div>
  );
}
