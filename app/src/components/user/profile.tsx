import React from "react";
import Link from "next/link";

export const UserProfile = ({
    name,
    email,
    nickname,
}: {
    name: string;
    email: string;
    nickname: string;
}) => {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Perfil do Usuário</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Nome</label>
                    <p className="text-lg font-semibold text-gray-800">{name}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg font-semibold text-gray-800">{email}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Apelido</label>
                    <p className="text-lg font-semibold text-gray-800">{nickname}</p>
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-500">
                        Para alterar sua senha, utilize o procedimento de recuperação de senha disponível no sistema.
                    </p>
                </div>
                <div className="mt-4">
                    <Link href="/user/update" className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700">
                        Editar Perfil
                    </Link>
                </div>
            </div>
        </div>
    );
};
