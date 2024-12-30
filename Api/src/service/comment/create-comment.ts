import { CommentsRepository } from "@/repositories/comment-repository";
import { PostsRepository } from "@/repositories/post-repository";
import { Comment } from "@prisma/client";

interface CreateCommentRequest {
    content: string;
    authorId: string;
    postId: string;
}

interface CreateCommentReply {
    comment: Comment
}

export class CreateCommentService {
    constructor(
        private commentRepository: CommentsRepository,
        private postRepository: PostsRepository
    ) { }

    async execute({ content, authorId, postId }: CreateCommentRequest): Promise<CreateCommentReply> {
        const post = await this.postRepository.findById(postId);
        
        if (!post) {
            throw new Error("Post not found")
        }

        const comment = await this.commentRepository.create({
            content,
            authorId,
            postId,
        })

        return { comment }

    }
}