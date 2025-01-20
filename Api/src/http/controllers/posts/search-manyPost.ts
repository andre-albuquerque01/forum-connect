
import { PostMapper } from "@/repositories/mapper/post-mapper";
import { makeSearchManyPostService } from "@/service/factories/post/make-search-many-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchManyPost(request: FastifyRequest, reply: FastifyReply) {
    const searchmanypostBody = z.object({
        q: z.string(),
        page: z.coerce.number().default(1)
    })

    const { q, page } = searchmanypostBody.parse(request.params)

    try {
        const searchManyPostService = makeSearchManyPostService()

        const { post } = await searchManyPostService.execute({ query: q, page })

        return reply.status(200).send(PostMapper.toDomainWithPagination(post))
    } catch (error) {
        return reply.status(400).send({ message: error })
    }
}