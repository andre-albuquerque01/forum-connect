import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UsersRepository {
    private items: User[] = []

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)
        return user ? user : null
    }
    async findById(id: string): Promise<User | null> {
        const user = this.items.find(item => item.id === id)
        return user ? user : null
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            name: data.name,
            nickname: data.nickname,
            email: data.email,
            password: data.password,
            created_at: new Date(),
        }

        this.items.push(user)

        return user
    }
    async save(data: User): Promise<User> {
        const index = this.items.findIndex(item => item.id === data.id)
        if (index > 0) {
            this.items[index] = data
        }
        return data
    }

    async delete(data: User): Promise<void> {
        const index = this.items.findIndex(item => item.id === data.id)
        if (index >= 0) {
            this.items.splice(index, 1)
        }
    }
}