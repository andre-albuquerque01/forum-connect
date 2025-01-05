import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { randomInt } from "crypto";

interface MakeUserFactoryProps {
    name?: string;
    password?: string;
    email?: string;
    nickname?: string
}

export class MakeUserFactory {
    static async create({ name, password, email, nickname }: MakeUserFactoryProps) {
        const data = prisma.user.create({
            data: {
                name: name || 'John Doe',
                email: email || `johndoe${randomInt(5)}@example.com`,
                password: await hash(password ? password : '123456', 6),
                nickname: nickname || `john_doe_${randomInt(5)}`,
            },
        })
        return data
    }
}