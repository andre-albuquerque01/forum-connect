import { Prisma, Comment } from "@prisma/client"

export interface CommentsRepository {
    findById(id: string): Promise<Comment | null>
    create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
    save(data: Prisma.CommentUncheckedUpdateInput): Promise<void>
    delete(data: Comment): Promise<void>
}