import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { CreatePostService } from "@/service/post/create-post"

export function makeCreatePostService() {
    const postsRepository = new PrismaPostRepository()
    const createPostService = new CreatePostService(postsRepository)

    return createPostService
}