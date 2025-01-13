import { Post, Prisma } from "@prisma/client";
import { PostsRepository } from "@/repositories/post-repository";

interface FindByUserPostRequest {
    id: string;
}

interface FindByUserPostReply {
    post: Prisma.PostGetPayload<{
        include: {
            author: true;
            Comment: {
                include: {
                    author: true;
                };
            };
        };
    }>[];
}

export class FindByUserPostService {
    constructor(private postRepository: PostsRepository) { }

    async execute({ id }: FindByUserPostRequest): Promise<FindByUserPostReply> {
        const post = await this.postRepository.findByUserPost(id)

        if (!post) {
            throw new Error("Post not found")
        }

        return { post }
    }
}