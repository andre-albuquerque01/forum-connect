import { Post } from "@prisma/client";
import { PostsRepository } from "@/repositories/post-repository";

interface DeletePostRequest {
    id: string;
    authorId: string;
}

interface DeletePostReply {
    message: string;
}

export class DeletePostService {
    constructor(private postRepository: PostsRepository) { }

    async execute({ id, authorId }: DeletePostRequest): Promise<DeletePostReply> {
        const post = await this.postRepository.findById(id)

        if (!post) {
            throw new Error("Post not found")
        }

        if (post.authorId !== authorId) {
            throw new Error("You are not authorized to update this post")
        }

        await this.postRepository.delete(post)

        return { message: 'success' }
    }
}