import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/user-repository";
import { hash } from "bcryptjs"

interface RegisterUserRequest {
    email: string;
    password: string;
    passwordConfirmation: string;
    name: string;
    nickname: string;
}

interface RegisterUserReply {
    user: User
}

export class RegisterService {
    constructor(private userRepository: UsersRepository) { }

    async execute({ name, email, password, passwordConfirmation, nickname }: RegisterUserRequest): Promise<RegisterUserReply> {
        if (password !== passwordConfirmation) {
            throw new Error('Passwords do not match')
        }

        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('Email already in use')
        }

        const user = await this.userRepository.create({
            email,
            name,
            nickname,
            password: password_hash
        })

        return { user }
    }
}