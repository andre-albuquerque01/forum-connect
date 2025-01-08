import { makeCreateCommentService } from "@/service/factories/comment/make-create-comment-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createComment(request: FastifyRequest, reply: FastifyReply) {
    const createcommentBody = z.object({
        postId: z.string().min(3).max(40),
        content: z.string().min(3).max(255),
    })

    const { postId, content } = createcommentBody.parse(request.body)

    try {
        const createcommentService = makeCreateCommentService()

        await createcommentService.execute({ postId, content, authorId: request.user.sub })

        return reply.status(204).send()
    } catch (error) {
        return reply.status(400).send({ message: error })
    }
}