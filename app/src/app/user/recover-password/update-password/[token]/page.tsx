import UpdatePasswordComponent from "@/components/user/recover-password/update-password";

type Params = Promise<{ token: string }>
export default async function UpdatePassword(props: { params: Params }) {
    const params = await props.params
    const token  = await params.token
    const urlToken = decodeURIComponent(token);

    return (
        <div className="bg-forum-gradient-2 h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden p-2">
            <UpdatePasswordComponent token={urlToken} />
        </div>
    )
}