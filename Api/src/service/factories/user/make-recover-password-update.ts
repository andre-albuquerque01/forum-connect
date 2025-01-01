import { PrismaRecoverPasswordRepository } from "@/repositories/prisma/prisma-recover-password-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RecoverPasswordUpdate } from "@/service/user/recover-password-update";

export function makeRecoverPasswordUpdate() {
    const userRepository = new PrismaUserRepository()
    const prismaRecoverPasswordRepository = new PrismaRecoverPasswordRepository()
    const recoverPasswordUpdate = new RecoverPasswordUpdate(userRepository, prismaRecoverPasswordRepository)

    return recoverPasswordUpdate
}