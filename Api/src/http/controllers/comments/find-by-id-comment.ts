
import { makeFindByIdCommentService } from "@/service/factories/comment/make-find-by-id-comment-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findByIdComment(request: FastifyRequest, reply: FastifyReply) {
    const findbyidcommentBody = z.object({
        id: z.string().uuid(),
    })

    const { id } = findbyidcommentBody.parse(request.params)

    try {
        const findbyidcommentService = makeFindByIdCommentService()

        const comment = await findbyidcommentService.execute({ id })

        return reply.status(200).send({ comment })
    } catch (error) {
        return reply.status(400).send({ message: error })
    }
}