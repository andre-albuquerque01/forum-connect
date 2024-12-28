import { Prisma, Comment } from "@prisma/client";
import { CommentsRepository } from "../comment-repository";
import { randomUUID } from "crypto";

export class InMemoryCommentRepository implements CommentsRepository {
    public items: Comment[] = []

    async findById(id: string): Promise<Comment | null> {
        const comment = this.items.find(item => item.id === id)
        return comment ? comment : null
    }

    async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
        const comment = {
            id: randomUUID(),
            content: data.content,
            authorId: data.authorId,
            postId: data.postId,
            createdAt: new Date(),
        }

        this.items.push(comment)

        return comment
    }

    async save(data: Comment): Promise<void> {
        const index = this.items.findIndex(item => item.id === data.id)
        if (index > 0) {
            this.items[index] = data
        }
    }

    async delete(data: Comment): Promise<void> {
        const index = this.items.findIndex(item => item.id === data.id)
        if (index >= 0) {
            this.items.splice(index, 1)
        }
    }
}