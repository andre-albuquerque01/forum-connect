import { PostsRepository } from "@/repositories/post-repository";
import { Prisma } from "@prisma/client";

interface FetchRecentPostRequest {
    page: number;
}
interface FetchRecentPostReply {
    post: {
        posts: Prisma.PostGetPayload<{
            include: {
                author: true;
                Comment: {
                    include: {
                        author: true;
                    };
                };
            };
        }>[]; 
        totalPages: number;
    };
}

export class FetchRecentPostService {
    constructor(private postRepository: PostsRepository) {}

    async execute({ page }: FetchRecentPostRequest): Promise<FetchRecentPostReply> {
        const post = await this.postRepository.findManyRecent({ page });
        return { post };
    }
}
