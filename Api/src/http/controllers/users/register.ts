import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterService } from "@/service/factories/user/make-register-service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBody = z.object({
        name: z.string().min(3).max(40),
        nickname: z.string().min(3).max(20),
        email: z.string().email(),
        termService: z.boolean(),
        password: z
            .string()
            .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
            .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
            .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
            .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um caractere especial." }),
        passwordConfirmation: z
            .string()
            .min(8, { message: "A confirmação de senha deve ter pelo menos 8 caracteres." }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "As senhas devem coincidir.",
    });

    const { name, email, password, passwordConfirmation, nickname, termService } = registerBody.parse(request.body)

    try {
        const registerService = makeRegisterService()

        await registerService.execute({ name, email, password, passwordConfirmation, nickname, termService })

    } catch (error) {
        return reply.status(400).send({
            error: error instanceof Error ? error.message : "Erro desconhecido.",
        });
    }
    return reply.status(204).send()
}