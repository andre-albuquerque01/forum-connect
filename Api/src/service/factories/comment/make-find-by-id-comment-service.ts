import { PrismaCommentRepository } from "@/repositories/prisma/prisma-comment-repository"
import { FindByIdCommentService } from "@/service/comment/find-by-id-comment"

export function makeFindByIdCommentService() {
    const commentsRepository = new PrismaCommentRepository()
    const findByIdCommentService = new FindByIdCommentService(commentsRepository)

    return findByIdCommentService
}