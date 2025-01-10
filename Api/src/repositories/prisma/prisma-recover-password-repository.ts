import { PasswordRecover, Prisma } from "@prisma/client";
import { RecoverPasswordRepository } from "../recover-password-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRecoverPasswordRepository implements RecoverPasswordRepository {

    async findByUserId(userId: string): Promise<PasswordRecover | null> {
        const passwordRecover = await prisma.passwordRecover.findFirst({
            where: {
                userId
            }
        })
        if (!passwordRecover) return null
        return passwordRecover
    }

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

    async save(data: PasswordRecover): Promise<PasswordRecover> {
        const passwordRecover = await prisma.passwordRecover.update({
            where: {
                id: data.id
            },
            data,
        })
        return passwordRecover
    }

    async delete(data: PasswordRecover): Promise<void> {
        await prisma.passwordRecover.delete({
            where: {
                id: data.id
            }
        })
    }
}