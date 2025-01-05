import { prisma } from "@/lib/prisma";
import { randomInt } from "crypto";

export class MakeCommentFactory {
    static create({ postId, content, authorId }: { postId?: string, content?: string, authorId?: string }) {
        const data = prisma.comment.create({
            data: {
                postId: postId || `johndoe${randomInt(5)}@example.com`,
                authorId: authorId || `johndoe${randomInt(5)}@example.com`,
                content: content || 'content123',
            },
        })
        return data
    }
}