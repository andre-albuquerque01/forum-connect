import { PrismaCommentRepository } from "@/repositories/prisma/prisma-comment-repository"
import { UpdateCommentService } from "@/service/comment/update-comment"

export function makeUpdateCommentService() {
    const commentsRepository = new PrismaCommentRepository()
    const updateCommentService = new UpdateCommentService(commentsRepository)

    return updateCommentService
}