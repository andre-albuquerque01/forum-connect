import { Prisma } from "@prisma/client";
import { PostsRepository } from "@/repositories/post-repository";

interface SearchManyPostRequest {
    query: string;
    page: number;
}

interface SearchManyPostReply {
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

export class SearchManyPostService {
    constructor(private postRepository: PostsRepository) { }

    async execute({ query, page }: SearchManyPostRequest): Promise<SearchManyPostReply> {
        const post = await this.postRepository.searchMany(query, { page })

        return { post }
    }
}