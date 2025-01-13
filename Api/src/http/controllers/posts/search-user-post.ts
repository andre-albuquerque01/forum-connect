import { PostMapper } from "@/repositories/mapper/post-mapper";
import { makeFindByUserPostService } from "@/service/factories/post/make-find-by-user-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchUserPost(request: FastifyRequest, reply: FastifyReply) {
    const searchUserPostBody = z.object({
        id: z.string(),
    })

    const { id } = searchUserPostBody.parse(request.params)

    try {
        const searchUserPostService = makeFindByUserPostService()

        const { post } = await searchUserPostService.execute({ id })
        
        return reply.status(200).send(PostMapper.toDomainList(post))
    } catch (error) {
        return reply.status(400).send({ message: error })
    }

}