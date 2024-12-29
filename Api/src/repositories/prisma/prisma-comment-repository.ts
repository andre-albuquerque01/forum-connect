import { Comment, Prisma, PrismaClient } from "@prisma/client";
import { CommentsRepository } from "../comment-repository";
import { prisma } from "@/lib/prisma";
import { PaginationParams } from "@/utils/paginationParams";

export class PrismaCommentRepository implements CommentsRepository {
    async findById(id: string): Promise<Comment | null> {
        const comment = await prisma.comment.findUnique({
            where: {
                id
            },
            include: {
                author: true
            },
        })

        if (!comment) return null
        return comment
    }

    async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
        const comment = prisma.comment.create({
            data
        })

        return comment
    }
    async save(data: Comment): Promise<void> {
        await prisma.comment.update({
            where: {
                id: data.id
            },
            data,
        })
    }

    async delete(data: Comment): Promise<void> {
        await prisma.comment.delete({
            where: {
                id: data.id
            }
        })
    }
    
}