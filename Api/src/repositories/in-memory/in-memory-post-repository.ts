import { Prisma, Post } from "@prisma/client";
import { PostsRepository } from "../post-repository";
import { randomUUID } from "crypto";
import { PaginationParams } from "@/utils/paginationParams";

export class InMemoryPostRepository implements PostsRepository {
    public items: Post[] = []

    async findById(id: string): Promise<Post | null> {
        const post = this.items.find(item => item.id === id)
        return post ? post : null
    }

    async findManyRecent({ page }: PaginationParams): Promise<Post[]> {
        return this.items
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice((page - 1) * 20, page * 20)
    }


    async searchMany(query: string, { page }: PaginationParams) {
        return this.items
            .filter((item) => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }

    async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
        const post = {
            id: randomUUID(),
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            createdAt: new Date(),
        }

        this.items.push(post)

        return post
    }

    async save(data: Post): Promise<void> {
        const index = this.items.findIndex(item => item.id === data.id)
        if (index > 0) {
            this.items[index] = data
        }
    }

    async delete(data: Post): Promise<void> {
        const index = this.items.findIndex(item => item.id === data.id)
        if (index >= 0) {
            this.items.splice(index, 1)
        }
    }
}