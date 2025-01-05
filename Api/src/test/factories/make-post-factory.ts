import { prisma } from "@/lib/prisma";
import { randomInt } from "crypto";

export class MakePostFactory {
    static create({title, content, authorId}: { title?: string, content?: string, authorId?: string}) {
        const data = prisma.post.create({
            data: {
                title: title || 'John Doe',
                authorId: authorId || `johndoe${randomInt(5)}@example.com`,
                content: content || 'content123',
            },
        })
        return data
    }
}