import { Comment } from "@prisma/client";
import { CommentsRepository } from "@/repositories/comment-repository";

interface FindByIdCommentRequest {
    id: string;
}

interface FindByIdCommentReply {
    comment: Comment
}

export class FindByIdCommentService {
    constructor(private commentRepository: CommentsRepository) { }

    async execute({ id }: FindByIdCommentRequest): Promise<FindByIdCommentReply> {
        const comment = await this.commentRepository.findById(id)

        if (!comment) {
            throw new Error("Comment not found")
        }


        return { comment }
    }
}