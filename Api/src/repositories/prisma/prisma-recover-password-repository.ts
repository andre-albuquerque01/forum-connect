import { PasswordRecover, Prisma } from "@prisma/client";
import { RecoverPasswordRepository } from "../recover-password-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRecoverPasswordRepository implements RecoverPasswordRepository {
    async findByToken(token: string): Promise<PasswordRecover | null> {
        const passwordRecover = await prisma.passwordRecover.findUnique({
            where: {
                token
            }
        })
        if (!passwordRecover) return null
        return passwordRecover
    }
    async create(data: Prisma.PasswordRecoverUncheckedCreateInput): Promise<PasswordRecover> {
        const passwordrecover = prisma.passwordRecover.create({
            data
        })

        return passwordrecover
    }

    async delete(data: PasswordRecover): Promise<void> {
        await prisma.passwordRecover.delete({
            where: {
                id: data.id
            }
        })
    }
}