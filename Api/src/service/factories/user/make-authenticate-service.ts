import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateService } from "@/service/user/authenticate";

export function makeAuthenticateService() {
    const userRepository = new PrismaUserRepository()
    const authenticateService = new AuthenticateService(userRepository)

    return authenticateService
}