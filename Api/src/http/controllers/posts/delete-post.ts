import { makeDeletePostService } from "@/service/factories/post/make-delete-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const deletepostBody = z.object({
        id: z.string().uuid(),
    })

    const { id } = deletepostBody.parse(request.params)

    try {
        const deletepostService = makeDeletePostService()

        await deletepostService.execute({ id, authorId: request.user.sub })

    } catch (error) {
        return reply.status(400).send({ message: error })
    }

    return reply.status(201).send()
}