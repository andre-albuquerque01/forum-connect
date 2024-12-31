import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { DeletePostService } from "@/service/post/delete-post"

export function makeDeletePostService() {
    const postsRepository = new PrismaPostRepository()
    const deletePostService = new DeletePostService(postsRepository)

    return deletePostService
}