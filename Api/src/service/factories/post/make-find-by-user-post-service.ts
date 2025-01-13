import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { FindByUserPostService } from "@/service/post/find-by-user-post"

export function makeFindByUserPostService() {
    const postsRepository = new PrismaPostRepository()
    const findByUserPostService = new FindByUserPostService(postsRepository)

    return findByUserPostService
}