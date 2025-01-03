import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/user-repository";
import { SendEmail } from "@/service/sendEmail/recover-password-send-email";
import { RecoverPasswordHtml, RecoverPasswordText } from "@/utils/recover-password-html-text";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { RecoverPasswordRepository } from "@/repositories/recover-password-repository";

interface RecoverPasswordSendEmailRequest {
    email: string;
}

interface RecoverPasswordSendEmailReply {
    token: string
}

export class RecoverPasswordSendEmail {
    constructor(
        private userRepository: UsersRepository,
        private recoverPasswordRepository: RecoverPasswordRepository,
    ) { }

    async execute({ email }: RecoverPasswordSendEmailRequest): Promise<RecoverPasswordSendEmailReply> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error("User not found")
        }

        const token = await hash(randomUUID(), 3)

        await SendEmail({ email: user.email, token })

        await this.recoverPasswordRepository.create({
            userId: user.id,
            token,
        })

        return { token }
    }
}