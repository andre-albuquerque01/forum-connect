import { makeCreatePostService } from "@/service/factories/post/make-create-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    const createpostBody = z.object({
        title: z.string().min(3).max(40),
        content: z.string().min(3).max(255),
    })

    const { title, content } = createpostBody.parse(request.body)

    try {
        const createpostService = makeCreatePostService()

        await createpostService.execute({ title, content, authorId: request.user.sub })

    } catch (error) {
        return reply.status(400).send({ message: error })
    }

    return reply.status(204).send()
}