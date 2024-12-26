import { makeUpdatePostService } from "@/service/factories/post/make-update-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    const updatepostBody = z.object({
        id: z.string().uuid(),
        title: z.string().min(3).max(40),
        content: z.string().min(3).max(255),
    })

    const { id } = updatepostBody.parse(request.params)
    const { title, content } = updatepostBody.parse(request.body)

    try {
        const updatepostService = makeUpdatePostService()

        await updatepostService.execute({ id, title, content, authorId: request.user.sub })

    } catch (error) {
        return reply.status(400).send({ message: error })
    }

    return reply.status(204).send()
}