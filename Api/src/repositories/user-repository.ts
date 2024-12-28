import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    save(data: Prisma.UserUncheckedUpdateInput): Promise<User>
    delete(data: User): Promise<void>
}