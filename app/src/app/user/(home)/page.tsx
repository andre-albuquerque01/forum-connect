import { ProfileUser } from "@/app/action";
import { UserProfile } from "@/components/user/profile";
import { redirect } from "next/navigation";

export default async function HomeUser() {
  const data = await ProfileUser();

  if (data.message === 'Unauthorized.') redirect('/user/login');

  return (
    <div className="bg-forum-gradient-2 h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden p-2">
      <UserProfile
        name={data.name}
        email={data.email}
        nickname={data.nickname}
      />
    </div>
  );
}
