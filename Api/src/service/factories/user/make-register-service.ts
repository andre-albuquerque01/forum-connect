import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterService } from "@/service/user/register";

export function makeRegisterService() {
    const userRepository = new PrismaUserRepository()
    const registerService = new RegisterService(userRepository)

    return registerService
}