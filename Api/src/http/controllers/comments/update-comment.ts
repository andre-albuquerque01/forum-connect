
import { makeUpdateCommentService } from "@/service/factories/comment/make-update-comment-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateComment(request: FastifyRequest, reply: FastifyReply) {
    const updatecommentBody = z.object({
        id: z.string().uuid(),
        content: z.string().min(3).max(255),
    })

    const { id } = updatecommentBody.parse(request.params)
    const { content } = updatecommentBody.parse(request.body)

    try {
        const updatecommentService = makeUpdateCommentService()

        await updatecommentService.execute({ id, content, authorId: request.user.sub })

    } catch (error) {
        return reply.status(400).send({ message: error })
    }

    return reply.status(204).send()
}