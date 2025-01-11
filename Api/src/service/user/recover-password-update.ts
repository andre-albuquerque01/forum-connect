import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/user-repository";
import { SendEmail } from "@/service/sendEmail/recover-password-send-email";
import { RecoverPasswordHtml, RecoverPasswordText } from "@/utils/recover-password-html-text";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { RecoverPasswordRepository } from "@/repositories/recover-password-repository";

interface RecoverPasswordUpdateRequest {
    token: string;
    password: string;
    passwordConfirmation: string;
}

interface RecoverPasswordUpdateReply {
    message: String
}

export class RecoverPasswordUpdate {
    constructor(
        private userRepository: UsersRepository,
        private recoverPasswordRepository: RecoverPasswordRepository,
    ) { }

    async execute({ token, password, passwordConfirmation }: RecoverPasswordUpdateRequest): Promise<RecoverPasswordUpdateReply> {
        const recover = await this.recoverPasswordRepository.findByToken(token)

        if (!recover) {
            throw new Error("Token invalido")
        }

        const user = await this.userRepository.findById(recover.userId)

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        if (password !== passwordConfirmation) {
            throw new Error("Senhas não conferem")
        }

        const hashedPassword = await hash(password, 6)

        await this.userRepository.save({
            id: user.id,
            email: user.email,
            password: hashedPassword
        })

        await this.recoverPasswordRepository.delete({
            id: recover.id,
            userId: recover.userId,
            token: recover.token,
            expiresAt: recover.expiresAt
        })

        return { message: "success" }
    }
}