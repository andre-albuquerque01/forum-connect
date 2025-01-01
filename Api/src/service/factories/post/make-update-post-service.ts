import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { UpdatePostService } from "@/service/post/update-post"

export function makeUpdatePostService() {
    const postsRepository = new PrismaPostRepository()
    const updatePostService = new UpdatePostService(postsRepository)

    return updatePostService
}