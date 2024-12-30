import { User, Prisma, PrismaClient } from "@prisma/client";
import { UsersRepository } from "../user-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UsersRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) return null
        return user
    }
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) return null
        return user
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = prisma.user.create({
            data
        })

        return user
    }
    async save(data: User): Promise<User> {
        const data1 = await prisma.user.update({
            where: {
                id: data.id
            },
            data,
        })

        return data1
    }

    async delete(data: User): Promise<void> {
        await prisma.user.delete({
            where: {
                id: data.id
            }
        })
    }
}