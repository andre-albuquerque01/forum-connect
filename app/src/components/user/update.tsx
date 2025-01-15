'use client'
import { UpdateUser } from "@/app/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export interface ProfileUserProps {
    email: string;
    nickname: string;
    name: string;
}

export const UpdateComponent = (data: ProfileUserProps) => {
    const [error, setError] = useState<string>()
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const userData = {
            name: formData.get("name"),
            nickname: formData.get("nickname"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const result = await UpdateUser(userData);
        if (result === 'success') {
            alert("Usuário atualizado com sucesso!");
            router.back();
        } else {
            setError(result);
        }
    };

    return (
        <div className="bg-forum-gradient-2 h-screen w-full flex justify-center items-center">
            <div className="bg-zinc-50 max-w-[1200px] w-[40%] h-[50%] flex flex-col justify-center items-center rounded-md sm:p-2 max-md:w-96 max-sm:mx-2 max-md:h-96 md:w-[560px]">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2 justify-center items-center h-[220px]">
                    <Link href="/user/login" className="w-96 max-md:w-80 text-sm flex flex-row items-center text-red-400 hover:text-blue-600">
                        <FaArrowLeft className="w-4 h-4 mr-2 " /> Voltar
                    </Link>
                    <h1 className="w-96 max-md:w-80 font-extrabold bg-forum-gradient-1 bg-clip-text text-transparent text-xl">Alteração do usuário</h1>
                    <input type="text" name="name" placeholder="Nome" className="border p-2 w-96 rounded-md max-md:w-80" defaultValue={data?.name ?? ''} />
                    <input type="text" name="nickname" placeholder="Apelido" className="border p-2 w-96 rounded-md max-md:w-80" defaultValue={data?.nickname ?? ''} />
                    <input type="email" name="email" placeholder="Email" className="border p-2 w-96 rounded-md max-md:w-80" defaultValue={data?.email ?? ''} />
                    <input type="password" name="password" placeholder="Sua senha" className="border p-2 w-96 rounded-md max-md:w-80" />
                    <button className="border bg-forum-gradient-1 text-white w-96 py-2 rounded-md max-md:w-80">Alterar</button>
                    <span className="w-96 max-md:w-80 text-justify flex flex-row items-center text-red-600 text-xs">
                        {error && error}
                    </span>
                </form>
            </div>
        </div>
    );
};
