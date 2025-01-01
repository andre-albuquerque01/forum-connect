import { PostsRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";

interface CreatePostRequest {
    title: string;
    content: string;
    authorId: string;
}

interface CreatePostReply {
    post: Post
}

export class CreatePostService {
    constructor(private postRepository: PostsRepository) { }

    async execute({ title, content, authorId }: CreatePostRequest): Promise<CreatePostReply> {
        const post = await this.postRepository.create({
            title,
            content,
            authorId,
        })

        return { post }

    }
}