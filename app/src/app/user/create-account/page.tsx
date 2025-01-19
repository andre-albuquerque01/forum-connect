import CreateAccountComponent from "@/components/user/create-account";

export default function CreateUser() {
    return (
        <section className="bg-forum-gradient-2 h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden p-2">
            <CreateAccountComponent />
        </section>
    )
}