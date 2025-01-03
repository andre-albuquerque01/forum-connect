import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/user-repository";
import { compare, hash } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateUserRequest {
    email: string;
    password: string;
}

interface AuthenticateUserReply {
    user: User
}

export class AuthenticateService {
    constructor(private userRepository: UsersRepository) { }

    async execute({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserReply> {
        const user = await this.userRepository.findByEmail(email)
        
        if (!user) {
            throw new InvalidCredentialsError()
        }

        const password_hash = await compare(password, user.password)

        if (!password_hash) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}