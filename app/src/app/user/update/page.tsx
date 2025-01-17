import { ProfileUser } from "@/app/action";
import { UpdateComponent } from "@/components/user/update";

export default async function Update() {
    const data = await ProfileUser()

    return (
        <div className="bg-forum-gradient-2 h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden p-2">
            <UpdateComponent email={data.email} name={data.name} nickname={data.nickname} />
        </div>
    )
};