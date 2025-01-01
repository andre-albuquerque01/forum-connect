import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateService } from "@/service/user/update";

export function makeUpdateService() {
    const userRepository = new PrismaUserRepository()
    const updateService = new UpdateService(userRepository)

    return updateService
}