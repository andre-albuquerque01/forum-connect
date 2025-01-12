import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/user-repository";
import { compare } from "bcryptjs"

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
            throw new Error("Email already in use");
        }

        const checkUser = await this.userRepository.findById(id);

        if (!checkUser) {
            throw new Error("Usuário não encontrado");
        }

        const passwordIsCorrect = await compare(password, checkUser.password);
        if (!passwordIsCorrect) {
            throw new Error("Senha incorreta");
        }
        
        const user = await this.userRepository.save({
            id,
            email,
            name,
            nickname,
        })

        return { user }
    }
}