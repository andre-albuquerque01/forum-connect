import { makeDeleteCommentService } from "@/service/factories/comment/make-delete-comment-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
    const deleteCommentBody = z.object({
        id: z.string(),
    })

    const { id } = deleteCommentBody.parse(request.params)

    try {
        const deleteCommentService = makeDeleteCommentService()

        await deleteCommentService.execute({ id, authorId: request.user.sub })

        return reply.status(201).send()
    } catch (error) {
        return reply.status(400).send({ message: error })
    }

}