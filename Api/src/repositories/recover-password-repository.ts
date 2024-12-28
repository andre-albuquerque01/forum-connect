import { PasswordRecover, Prisma } from "@prisma/client"

export interface RecoverPasswordRepository {
    findByToken(token: string): Promise<PasswordRecover | null>
    create(data: Prisma.PasswordRecoverUncheckedCreateInput): Promise<PasswordRecover>
    delete(data: PasswordRecover): Promise<void>
}