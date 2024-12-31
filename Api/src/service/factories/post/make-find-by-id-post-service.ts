import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { FindByIdPostService } from "@/service/post/find-by-id-post"

export function makeFindByIdPostService() {
    const postsRepository = new PrismaPostRepository()
    const findByIdPostService = new FindByIdPostService(postsRepository)

    return findByIdPostService
}