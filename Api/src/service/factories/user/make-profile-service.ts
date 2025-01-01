import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ProfileService } from "@/service/user/profile";

export function makeProfileService() {
    const userRepository = new PrismaUserRepository()
    const profileService = new ProfileService(userRepository)
    
    return profileService
}