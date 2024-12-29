import { Prisma, User as PrismaUser, User } from "@prisma/client";

export class UserMapper {
    static toDomain(raw: PrismaUser): Prisma.UserUncheckedUpdateInput {
        return {
            id: raw.id.toString(),
            name: raw.name,
            email: raw.email,
            nickname: raw.nickname,
        }
    }
}