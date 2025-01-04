import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/user-repository";
import { hash } from "bcryptjs"

interface UpdateUserRequest {
    id: string;
    email: string;
    password: string;
    name: string;
    nickname: string;
}

interface UpdateUserReply {
    user: User
}

export class UpdateService {
    constructor(private userRepository: UsersRepository) { }

    async execute({ id, name, email, password, nickname }: UpdateUserRequest): Promise<UpdateUserReply> {
        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail && userWithSameEmail.id !== id) {
            throw new Error('Email already in use');
        }

        const password_hash = await hash(password, 6)

        const user = await this.userRepository.save({
            id,
            email,
            name,
            nickname,
            password: password_hash
        })

        return { user }
    }
}