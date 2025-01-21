'use client'
import { LoginUser } from "@/app/action";
import Link from "next/link";
import { useActionState } from "react";
import { GoBack } from "../nav/goBack";

export default function LoginComponent() {
    const [state, action, pending] = useActionState(LoginUser, {
        ok: false,
        error: '',
        data: null,
    })

    return (
        <div className="bg-forum-gradient-2 h-screen w-full flex justify-center items-center">
            <div className="bg-zinc-50 max-w-[1200px] w-[30%] min-h-[40%] flex flex-col justify-center items-center rounded-md sm:p-2 max-md:w-96 max-sm:mx-2 max-md:h-96 md:w-[520px]">
                <form action={action} className="flex flex-col space-y-2 justify-center items-center h-[220px]">
                    <GoBack />
                    <h1 className="w-96 max-md:w-80 font-extrabold bg-forum-gradient-1 bg-clip-text text-transparent text-xl">Sing in</h1>
                    <input type="email" name="email" placeholder="Email" className="border p-2 w-96 rounded-md max-md:w-80" required />
                    <input type="password" name="password" placeholder="Password" className="border p-2 w-96 rounded-md max-md:w-80" required />
                    <Link href='/user/recover-password/send-email' className="w-96 text-xs text-blue-400 hover:text-blue-600 max-md:w-80">Esqueceu a senha?</Link>
                    <button
                        className="border bg-forum-gradient-1 text-white w-96 py-2 rounded-md max-md:w-80"
                        disabled={pending}>
                        Entrar
                    </button>
                    <span className="w-96 max-md:w-80 text-justify flex flex-row items-center text-red-600 text-xs" aria-live="polite">
                        {state.error && state.error}
                    </span>
                </form>
                <Link href='/user/create-account' className="w-96 mt-5 text-center text-sm text-blue-400 hover:text-blue-600 max-md:w-80">Não tem conta?</Link>
            </div>
        </div>
    )
}