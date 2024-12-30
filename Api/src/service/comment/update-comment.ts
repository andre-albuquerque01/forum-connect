import { Comment } from "@prisma/client";
import { CommentsRepository } from "@/repositories/comment-repository";

interface UpdateCommentRequest {
    id: string;
    content: string;
    authorId: string;
}

interface UpdateCommentReply {
    message: string
}

export class UpdateCommentService {
    constructor(private commentRepository: CommentsRepository) { }

    async execute({ id, content, authorId }: UpdateCommentRequest): Promise<UpdateCommentReply> {
        const commentFind = await this.commentRepository.findById(id)

        if (!commentFind) {
            throw new Error("Comment not found")
        }

        if (commentFind.authorId !== authorId) {
            throw new Error("You are not authorized to update this comment")
        }

        await this.commentRepository.save({
            id,
            content,
        })

        return { message: 'success' }
    }
}