import { makeUpdatePostService } from "@/service/factories/post/make-update-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    const updatepostBody = z.object({
        id: z.string().uuid(),
        title: z.string().min(3).max(100),
        content: z.string().max(255),
    })

    const { id, title, content } = updatepostBody.parse(request.body)

    try {
        const updatepostService = makeUpdatePostService()

        await updatepostService.execute({ id, title, content, authorId: request.user.sub })

        return reply.status(204).send()
    } catch (error) {
        return reply.status(400).send({
            error: error instanceof Error ? error.message : "Erro desconhecido.",
        });
    }
}