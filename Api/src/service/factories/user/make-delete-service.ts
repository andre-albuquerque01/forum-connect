import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { DeleteService } from "@/service/user/delete";

export function makeDeleteService() {
    const userRepository = new PrismaUserRepository()
    const deleteService = new DeleteService(userRepository)

    return deleteService
}