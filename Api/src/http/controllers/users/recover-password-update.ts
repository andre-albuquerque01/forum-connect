import { makeRecoverPasswordUpdate } from "@/service/factories/user/make-recover-password-update";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function recoverPassworUpdate(request: FastifyRequest, reply: FastifyReply) {
    const recoverPassworUpdate = z.object({
        token: z.string(),
        password: z.string().min(8),
        passwordConfirmation: z.string().min(8),
    })

    const { token, password, passwordConfirmation } = recoverPassworUpdate.parse(request.body)

    try {
        const recoverPassworUpdateService = makeRecoverPasswordUpdate()

        await recoverPassworUpdateService.execute({ token, password, passwordConfirmation })

    } catch (error) {
        return reply.status(400).send({ message: error })
    }

    return reply.status(200).send()
}