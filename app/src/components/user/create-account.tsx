'use client'
import { RegisterUser } from "@/app/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { GoBack } from "../nav/goBack";

export default function CreateAccountComponent() {
    const BtnForm = () => {
        const { pending } = useFormStatus()
        return (
            <>
                {pending ? (
                    <button
                        className="border bg-forum-gradient-1 text-white w-96 py-2 rounded-md max-md:w-80"
                        disabled={pending}>
                        Cadastrando...
                    </button>
                ) : (
                    <button className="border bg-forum-gradient-1 text-white w-96 py-2 rounded-md max-md:w-80">Cadastrar</button>
                )}
            </>
        )
    }

    const [state, action] = useActionState(RegisterUser, {
        ok: false,
        error: '',
        data: null,
    })
    const router = useRouter()

    useEffect(() => {
        if (state.ok) {
            alert('Usuário cadastrado com sucesso!')
            router.back()
        }
    }, [state, router]);

    return (
        <div className="bg-forum-gradient-2 h-screen w-full flex justify-center items-center">
            <div className="bg-zinc-50 max-w-[1200px] w-[40%] min-h-[50%] flex flex-col justify-center items-center rounded-md sm:p-2 max-md:w-96 max-sm:mx-2 max-md:h-96 md:w-[560px]">
                <form action={action} className="flex flex-col space-y-2 justify-center items-center min-h-[220px] py-2">
                    <GoBack />
                    <h1 className="w-96 max-md:w-80 font-extrabold bg-forum-gradient-1 bg-clip-text text-transparent text-xl">Sing up</h1>
                    <input type="text" name="name" placeholder="Nome" className="border p-2 w-96 rounded-md max-md:w-80" required />
                    <input type="text" name="nickname" placeholder="Apelido" className="border p-2 w-96 rounded-md max-md:w-80" required />
                    <input type="email" name="email" placeholder="Email" className="border p-2 w-96 rounded-md max-md:w-80" required />
                    <input type="password" name="password" placeholder="Senha" className="border p-2 w-96 rounded-md max-md:w-80" required />
                    <input type="password" name="passwordConfirmation" placeholder="Repetir senha" className="border p-2 w-96 rounded-md max-md:w-80" required />
                    <div className="w-96 max-md:w-80 text-sm flex flex-row items-center space-x-1 text-blue-400 hover:text-blue-600 underline">
                        <input type="checkbox" name="termService" className="p-2 rounded-md mr-1" required />
                        <Link href="/user/term" >
                            Termos de serviços e politicas de privacidade
                        </Link>
                    </div>
                    <BtnForm />
                    <span className="w-96 max-md:w-80 text-justify flex flex-row items-center text-red-600 text-xs" aria-live="polite">
                        {state.error && state.error}
                    </span>
                </form>
            </div>
        </div>
    )
}