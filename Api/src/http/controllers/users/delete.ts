import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteService } from "@/service/factories/user/make-delete-service";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteService = makeDeleteService()

        const { message } = await deleteService.execute({ id: request.user.sub })

        return reply.status(200).send({ message })
    } catch (error) {
        return reply.status(400).send({ message: error })
    }
}