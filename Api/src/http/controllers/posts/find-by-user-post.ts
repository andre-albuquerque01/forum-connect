import { PostMapper } from "@/repositories/mapper/post-mapper";
import { makeFindByUserPostService } from "@/service/factories/post/make-find-by-user-post-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function findByUserPost(request: FastifyRequest, reply: FastifyReply) {
    try {
        const findByUserPostService = makeFindByUserPostService()

        const { post } = await findByUserPostService.execute({ id: request.user.sub })

        return reply.status(200).send(PostMapper.toDomainList(post))
    } catch (error) {
        return reply.status(400).send({ message: error })
    }

}