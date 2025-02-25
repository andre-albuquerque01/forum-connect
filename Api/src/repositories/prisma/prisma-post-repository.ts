import { Post, Prisma } from "@prisma/client";
import { PostsRepository } from "../post-repository";
import { prisma } from "@/lib/prisma";
import { PaginationParams } from "@/utils/paginationParams";

export class PrismaPostRepository implements PostsRepository {
    async findById(id: string): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
        })

        if (!post) return null
        return post
    }

    async findByUserPost(id: string): Promise<
        Prisma.PostGetPayload<{
            include: {
                author: true;
                Comment: {
                    include: {
                        author: true;
                    };
                };
            };
        }>[]
    > {
        const post = await prisma.post.findMany({
            where: {
                authorId: id
            },
            include: {
                author: true,
                Comment: {
                    include: {
                        author: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return post
    }

    async searchMany(query: string, { page }: PaginationParams): Promise<{
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
    }> {
        const itemsPerPage = 20;
        const totalCount = await prisma.post.count({
            where: {
                OR: [
                    { title: { contains: query } },
                    { content: { contains: query } }
                ]
            },
        });
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { content: { contains: query } }
                ]
            },
            include: {
                author: true,
                Comment: {
                    include: {
                        author: true,
                    },
                },
            },
            take: itemsPerPage,
            skip: (page - 1) * itemsPerPage,
            orderBy: {
                createdAt: "desc",
            },
        })

        return { posts, totalPages };
    }

    async findManyRecent({ page }: PaginationParams): Promise<{
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
    }> {
        const itemsPerPage = 20;
        const totalCount = await prisma.post.count();
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        const posts = await prisma.post.findMany({
            take: itemsPerPage,
            skip: (page - 1) * itemsPerPage,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: true,
                Comment: {
                    include: {
                        author: true,
                    },
                },
            },
        });

        return { posts, totalPages };
    }


    async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
        const post = prisma.post.create({
            data
        })

        return post
    }
    async save(data: Post): Promise<void> {
        await prisma.post.update({
            where: {
                id: data.id
            },
            data,
        })
    }

    async delete(data: Post): Promise<void> {
        await prisma.post.delete({
            where: {
                id: data.id
            }
        })
    }
}