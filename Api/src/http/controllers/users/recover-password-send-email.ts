import { makeRecoverPasswordSendEmail } from "@/service/factories/user/make-recover-password-send-email";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function recoverPassworSendEmail(request: FastifyRequest, reply: FastifyReply) {
    const recoverPassworSendEmail = z.object({
        email: z.string().email(),
    })

    const { email } = recoverPassworSendEmail.parse(request.body)

    try {
        const recoverPassworSendEmailService = makeRecoverPasswordSendEmail()

        await recoverPassworSendEmailService.execute({ email })

    } catch (error) {
        return reply.status(400).send({
            error: error instanceof Error ? error.message : "Erro desconhecido.",
        });
    }

    return reply.status(200).send()
}