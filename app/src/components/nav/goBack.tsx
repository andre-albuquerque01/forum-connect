'use client'

import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"

export const GoBack = () => {
    const router = useRouter()

    return (
        <div onClick={() => router.back()} className="w-96 max-md:w-80 text-sm flex flex-row items-center text-red-400 hover:text-blue-600 cursor-pointer ">
            <FaArrowLeft className="w-4 h-4 mr-2 " /> Voltar
        </div>
    )
}