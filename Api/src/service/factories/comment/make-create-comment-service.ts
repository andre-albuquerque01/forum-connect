import { PrismaCommentRepository } from "@/repositories/prisma/prisma-comment-repository"
import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { CreateCommentService } from "@/service/comment/create-comment"

export function makeCreateCommentService() {
    const commentsRepository = new PrismaCommentRepository()
    const postsRepository = new PrismaPostRepository()
    const createCommentService = new CreateCommentService(commentsRepository, postsRepository)

    return createCommentService
}