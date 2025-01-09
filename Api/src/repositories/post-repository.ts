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
    searchMany(query: string, params: PaginationParams): Promise<Prisma.PostGetPayload<{
        include: {
            author: true;
            Comment: {
                include: {
                    author: true;
                };
            };
        };
    }>[]>
    findManyRecent(params: PaginationParams): Promise<Prisma.PostGetPayload<{
        include: {
            author: true;
            Comment: {
                include: {
                    author: true;
                };
            };
        };
    }>[]>
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    save(data: Prisma.PostUpdateInput): Promise<void>
    delete(data: Post): Promise<void>
}