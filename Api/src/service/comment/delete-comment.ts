import { Comment } from "@prisma/client";
import { CommentsRepository } from "@/repositories/comment-repository";

interface DeleteCommentRequest {
    id: string;
    authorId: string;
}

interface DeleteCommentReply {
    message: string;
}

export class DeleteCommentService {
    constructor(private commentRepository: CommentsRepository) { }

    async execute({ id, authorId }: DeleteCommentRequest): Promise<DeleteCommentReply> {
        const comment = await this.commentRepository.findById(id)

        if (!comment) {
            throw new Error("Comment not found")
        }

        if (comment.authorId !== authorId) {
            throw new Error("You are not authorized to update this comment")
        }

        await this.commentRepository.delete(comment)

        return { message: 'success' }
    }
}