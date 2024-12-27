import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterService } from "@/service/factories/user/make-register-service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBody = z.object({
        name: z.string().min(3).max(40),
        nickname: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(8),
        passwordConfirmation: z.string().min(8),
    })

    const { name, email, password, passwordConfirmation, nickname } = registerBody.parse(request.body)

    try {
        const registerService = makeRegisterService()

        await registerService.execute({ name, email, password, passwordConfirmation, nickname })

    } catch (error) {
        return reply.status(400).send({ message: error })
    }

    return reply.status(204).send()
}