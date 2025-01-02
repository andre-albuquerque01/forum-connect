import { Post } from "@prisma/client";
import { PostsRepository } from "@/repositories/post-repository";

interface UpdatePostRequest {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

interface UpdatePostReply {
    message: string
}

export class UpdatePostService {
    constructor(private postRepository: PostsRepository) { }

    async execute({ id, title, content, authorId }: UpdatePostRequest): Promise<UpdatePostReply> {
        const postFind = await this.postRepository.findById(id)

        if (!postFind) {
            throw new Error("Post not found")
        }

        if (postFind.authorId !== authorId) {
            throw new Error("You are not authorized to update this post")
        }

        await this.postRepository.save({
            id,
            title,
            content,
        })

        return { message: 'success' }
    }
}