import { PasswordRecover, Prisma } from "@prisma/client";
import { RecoverPasswordRepository } from "../recover-password-repository";
import { randomUUID } from "node:crypto";

export class InMemoryRecoverPassword implements RecoverPasswordRepository {
    private items: PasswordRecover[] = [];

    async findByToken(token: string): Promise<PasswordRecover | null> {
        const recover = this.items.find(item => item.token === token)
        return recover ? recover : null
    }

    async create(data: Prisma.PasswordRecoverUncheckedCreateInput): Promise<PasswordRecover> {
        const recoverPassowrd = {
            id: randomUUID(),
            userId: data.userId,
            token: data.token,
            expiresAt: new Date(),
        }

        this.items.push(recoverPassowrd)

        return recoverPassowrd
    }

    async delete(data: PasswordRecover): Promise<void> {
        const index = this.items.findIndex(item => item.id === data.id)
        if (index >= 0) {
            this.items.splice(index, 1)
        }
    }
}