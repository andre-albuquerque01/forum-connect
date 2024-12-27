import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateService } from "@/service/factories/user/make-update-service";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateBody = z.object({
        name: z.string().min(3).max(40),
        nickname: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(8),
    })

    const { name, email, password, nickname } = updateBody.parse(request.body)

    try {
        const updateService = makeUpdateService()

        await updateService.execute({ id: request.user.sub, name, email, password, nickname })

    } catch (error) {
        return reply.status(400).send({ message: error })
    }

    return reply.status(201).send()
}