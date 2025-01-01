import { PrismaRecoverPasswordRepository } from "@/repositories/prisma/prisma-recover-password-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RecoverPasswordSendEmail } from "@/service/user/recover-password-send-email";

export function makeRecoverPasswordSendEmail() {
    const userRepository = new PrismaUserRepository()
    const prismaRecoverPasswordRepository = new PrismaRecoverPasswordRepository()
    const recoverPasswordSendEmail = new RecoverPasswordSendEmail(userRepository, prismaRecoverPasswordRepository)

    return recoverPasswordSendEmail
}