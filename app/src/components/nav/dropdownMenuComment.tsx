'use client';
import { DeleteComment } from "@/app/action";
import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface DropdownProps {
    commentId: string;
}

export const DropdownMenuComment: React.FC<DropdownProps> = ({ commentId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDelete = async () => {
        if (confirm('Tem certeza que quer deletar?')) {
            setIsOpen(false)
            await DeleteComment(commentId);
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
                <BsThreeDotsVertical className="w-3 h-3" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 z-10 rounded shadow-lg w-40">
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
