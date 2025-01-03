import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/user-repository";

interface ProfileUserRequest {
    id: string;
}

interface ProfileUserReply {
    user: User
}

export class ProfileService {
    constructor(private userRepository: UsersRepository) { }

    async execute({ id }: ProfileUserRequest): Promise<ProfileUserReply> {
        if (!id) {
            throw new Error("User ID is required")
        }

        const user = await this.userRepository.findById(id)
        
        if (!user) {
            throw new Error("User not found")
        }

        return { user }
    }
}