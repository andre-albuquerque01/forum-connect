'use client';
import { DeleteThread } from "@/app/action";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface DropdownProps {
    questionId: string;
}

export const DropdownMenuThreads: React.FC<DropdownProps> = ({ questionId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDelete = async () => {
        if (confirm('Tem certeza que quer deletar?')) {
            await DeleteThread(questionId);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* ⋮ */}
                <BsThreeDotsVertical className="w-3 h-3" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-40">
                    <Link href={`/threads/get/${questionId}`}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                        Editar
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                        Excluir
                    </button>
                </div>
            )}
        </div>
    );
};