import { GetByIdThread } from "@/app/action";
import UpdateThreadComponent from "@/components/thread/update-thread";

type Params = Promise<{ id: string }>
export default async function ThreadUpdate(props: { params: Params }) {
  const params = await props.params
  const id = await params.id;
  const { title, content } = await GetByIdThread(id);

  return (
    <div className="bg-forum-gradient-2 w-full h-[calc(100vh-64px)] flex flex-col items-center py-10">
      <UpdateThreadComponent id={id} title={title} content={content} />
    </div>
  );
}
