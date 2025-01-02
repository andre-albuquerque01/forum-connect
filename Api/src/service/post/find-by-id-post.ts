import { Post } from "@prisma/client";
import { PostsRepository } from "@/repositories/post-repository";

interface FindByIdPostRequest {
    id: string;
}

interface FindByIdPostReply {
    post: Post
}

export class FindByIdPostService {
    constructor(private postRepository: PostsRepository) { }

    async execute({ id }: FindByIdPostRequest): Promise<FindByIdPostReply> {
        const post = await this.postRepository.findById(id)

        if (!post) {
            throw new Error("Post not found")
        }


        return { post }
    }
}