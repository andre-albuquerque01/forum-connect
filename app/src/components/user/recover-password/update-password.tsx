'use client'
import { RecoverPasswordUpdate } from "@/app/action";
import { GoBack } from "@/components/nav/goBack";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function UpdatePasswordComponent({ token }: { token: string }) {
    const BtnForm = () => {
        const { pending } = useFormStatus()
        return (
            <>
                {pending ? (
                    <button
                        className="border bg-forum-gradient-1 text-white w-96 py-2 rounded-md max-md:w-80"
                        disabled={pending}>
                        Alterando...
                    </button>
                ) : (
                    <button className="border bg-forum-gradient-1 text-white w-96 py-2 rounded-md max-md:w-80">Alterando</button>
                )}
            </>
        )
    }

    const [state, action] = useActionState(RecoverPasswordUpdate, {
        ok: false,
        error: '',
        data: null,
    })
    const router = useRouter()

    useEffect(() => {
        if (state.ok) {
            alert('Email de recuperação enviado com sucesso!')
            router.push('/user/login')
        }
    }, [state, router])

    return (
        <div className="bg-forum-gradient-2 h-screen w-full flex justify-center items-center">
            <div className="bg-zinc-50 max-w-[1200px] w-[40%] h-[50%] flex flex-col justify-center items-center rounded-md sm:p-2 max-md:w-96 max-sm:mx-2 max-md:h-96 md:w-[560px]">
                <form action={action} className="flex flex-col space-y-2 justify-center items-center h-[220px]">
                    <GoBack />
                    <input type="hidden" name="token" value={token} />
                    <h1 className="w-96 max-md:w-80 font-extrabold bg-forum-gradient-1 bg-clip-text text-transparent text-xl">Alteração do usuário</h1>
                    <input type="password" name="password" placeholder="Senha" className="border p-2 w-96 rounded-md max-md:w-80" />
                    <input type="password" name="passwordConfirmation" placeholder="Repetir senha" className="border p-2 w-96 rounded-md max-md:w-80" />
                    <BtnForm />
                    <span className="w-96 max-md:w-80 text-justify flex flex-row items-center text-red-600 text-xs" aria-live="polite">
                        {state.error && state.error}
                    </span>
                </form>
            </div>
        </div>
    )
}