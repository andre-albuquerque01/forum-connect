
import { makeFindByIdPostService } from "@/service/factories/post/make-find-by-id-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findByIdPost(request: FastifyRequest, reply: FastifyReply) {
    const findByIdPostBody = z.object({
        id: z.string().uuid(),
    })

    const { id } = findByIdPostBody.parse(request.params)

    try {
        const findByIdPostService = makeFindByIdPostService()

        const { post } = await findByIdPostService.execute({ id })

        return reply.status(200).send(post)
    } catch (error) {
        return reply.status(400).send({ message: error })
    }

}