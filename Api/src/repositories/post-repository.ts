import { Prisma, Post } from "@prisma/client"
import { PaginationParams } from "../utils/paginationParams"

export interface PostsRepository {
    findById(id: string): Promise<Post | null>
    findByUserPost(id: string):  Promise<Prisma.PostGetPayload<{
        include: {
            author: true;
            Comment: {
                include: {
                    author: true;
                };
            };
        };
    }>[]>
    searchMany(query: string, params: PaginationParams): Promise<{
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
    }>
    findManyRecent(params: PaginationParams): Promise<{
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
    }> 
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    save(data: Prisma.PostUpdateInput): Promise<void>
    delete(data: Post): Promise<void>
}