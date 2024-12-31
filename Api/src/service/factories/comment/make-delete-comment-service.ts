import { PrismaCommentRepository } from "@/repositories/prisma/prisma-comment-repository"
import { DeleteCommentService } from "@/service/comment/delete-comment"

export function makeDeleteCommentService() {
    const commentsRepository = new PrismaCommentRepository()
    const deleteCommentService = new DeleteCommentService(commentsRepository)

    return deleteCommentService
}