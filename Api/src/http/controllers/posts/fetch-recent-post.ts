
import { PostMapper } from "@/repositories/mapper/post-mapper";
import { makeFetchRecentPostService } from "@/service/factories/post/make-fetch-recent-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchRecentPost(request: FastifyRequest, reply: FastifyReply) {
    const fetchrecentpostBody = z.object({
        page: z.coerce.number().default(1)
    })

    const { page } = fetchrecentpostBody.parse(request.params)

    try {
        const fetchRecentPostService = makeFetchRecentPostService()

        const { post } = await fetchRecentPostService.execute({ page })

        return reply.status(200).send(PostMapper.toDomainList(post))
    } catch (error) {
        return reply.status(400).send({ message: error })
    }
}