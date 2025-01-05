import { prisma } from "@/lib/prisma";

interface MakeRecoverPassworSendEmailProps {
    token?: string;
    userId: string;
}

export class MakeRecoverPassworSendEmail {
    static async create({ token, userId }: MakeRecoverPassworSendEmailProps) {
        const data = prisma.passwordRecover.create({
            data: {
                token: token || 'John Doe',
                userId
            },
        })
        return data
    }
}