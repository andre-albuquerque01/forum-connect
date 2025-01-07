import UpdatePasswordComponent from "@/components/user/recover-password/update-password";

export default async function UpdatePassword({ params }: { params: { token: string } }) {
    const { token } = await params
    return (
        <UpdatePasswordComponent token={token} />
    )
}