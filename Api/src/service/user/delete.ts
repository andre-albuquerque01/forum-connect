import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/user-repository";

interface DeleteUserRequest {
    id: string;
}

interface DeleteUserReply {
    message: String
}

export class DeleteService {
    constructor(private userRepository: UsersRepository) { }

    async execute({ id }: DeleteUserRequest): Promise<DeleteUserReply> {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new Error("User not found")
        }

        await this.userRepository.delete(user)

        return { message: "User deleted" }
    }
}