'use client'
import { logout } from "@/app/action";
import { LuLogOut } from "react-icons/lu"

export const ButtonLogout = () => {
    const handleLogout = async () => {
        alert('Logout efetuado!')
        await logout();
    };

    return (
        <button
            onClick={handleLogout}
            className="px-2 py-2 hover:bg-white hover:text-black rounded-md transition"
            title="Sair"
        >
            <LuLogOut className="w-5 h-5" />
        </button>
    )
}