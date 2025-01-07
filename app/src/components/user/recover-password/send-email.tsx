import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function SendEmailComponent() {
    return (
        <div className="bg-forum-gradient-2 h-screen w-full flex justify-center items-center">
            <div className="bg-zinc-50 max-w-[1200px] w-[30%] h-[40%] flex flex-col justify-center items-center rounded-md sm:p-2 max-md:w-96 max-sm:mx-2 max-md:h-96 md:w-[520px]">
                <form className="flex flex-col space-y-2 justify-center items-center h-[220px]">
                    <Link href="/" className="w-96 max-md:w-80 text-sm flex flex-row items-center text-red-400 hover:text-blue-600">
                        <FaArrowLeft className="w-4 h-4 mr-2 " /> Voltar
                    </Link>
                    <h1 className="w-96 max-md:w-80 font-extrabold bg-forum-gradient-1 bg-clip-text text-transparent text-xl">Recuperação de senha</h1>
                    <input type="email" placeholder="Email" className="border p-2 w-96 rounded-md max-md:w-80" />
                    <button type="submit" className="border bg-forum-gradient-1 text-white w-96 py-2 rounded-md max-md:w-80">Recuperar</button>
                </form>
            </div>
        </div>
    )
}