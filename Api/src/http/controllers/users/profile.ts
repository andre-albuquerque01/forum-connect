import { FastifyReply, FastifyRequest } from "fastify";
import { makeProfileService } from "@/service/factories/user/make-profile-service";
import { UserMapper } from "@/repositories/mapper/user-mapper";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    try {
        const profileService = makeProfileService()

        const { user } = await profileService.execute({ id: request.user.sub })

        return reply.status(200).send(UserMapper.toDomain(user))
    } catch (error) {
        return reply.status(400).send({ message: error })
    }
}