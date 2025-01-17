import UpdatePasswordComponent from "@/components/user/recover-password/update-password";

export default async function UpdatePassword({ params }: { params: { token: string } }) {
    const { token } = await params
    const urlToken = decodeURIComponent(token);

    return (
        <div className="bg-forum-gradient-2 h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden p-2">
            <UpdatePasswordComponent token={urlToken} />
        </div>
    )
}