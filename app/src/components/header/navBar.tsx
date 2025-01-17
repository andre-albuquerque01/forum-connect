import Link from "next/link"
import SearchForm from "./searchForm"
import { BiHome, BiLogIn, BiUser } from "react-icons/bi"
import { ButtonLogout } from "../user/button-logout"
import { cookies } from "next/headers"

export const Header = async () => {
    const cookistore = await cookies()
    const token = cookistore.get('token')?.value
    return (
        <nav className="bg-forum-gradient-3 h-16">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
                <div className="max-md:hidden">
                    <SearchForm />
                </div>
                <div className="flex justify-between items-center text-white ">
                    <Link
                        href="/"
                        className="px-2 py-2 hover:bg-white hover:text-black rounded-md transition"
                        title="Inicio"
                    >
                        <BiHome className="w-5 h-5" />
                    </Link>
                    {token && (
                        <Link
                            href="/user"
                            className="px-2 py-2 hover:bg-white hover:text-black rounded-md transition"
                            title="Perfil"
                        >
                            <BiUser className="w-5 h-5" />
                        </Link>
                    )}
                    {token ? (
                        <ButtonLogout />
                    ) : (
                        <Link
                            href="/user/login"
                            className="px-2 py-2 hover:bg-white hover:text-black rounded-md transition"
                            title="Login"
                        >
                            <BiLogIn className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}