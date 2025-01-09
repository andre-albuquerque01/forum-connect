import { PasswordRecover, Prisma } from "@prisma/client"

export interface RecoverPasswordRepository {
    findByUserId(userId: string): Promise<PasswordRecover | null>
    findByToken(token: string): Promise<PasswordRecover | null>
    create(data: Prisma.PasswordRecoverUncheckedCreateInput): Promise<PasswordRecover>
    save(data: PasswordRecover): Promise<PasswordRecover>
    delete(data: PasswordRecover): Promise<void>
}