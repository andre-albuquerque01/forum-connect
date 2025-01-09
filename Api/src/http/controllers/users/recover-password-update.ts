import { makeRecoverPasswordUpdate } from "@/service/factories/user/make-recover-password-update";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function recoverPassworUpdate(request: FastifyRequest, reply: FastifyReply) {
    const recoverPassworUpdate = z.object({
        token: z.string(),
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

    const { token, password, passwordConfirmation } = recoverPassworUpdate.parse(request.body)

    try {
        const recoverPassworUpdateService = makeRecoverPasswordUpdate()
        
        await recoverPassworUpdateService.execute({ token, password, passwordConfirmation })

    } catch (error) {
        return reply.status(400).send({
            error: error instanceof Error ? error.message : "Erro desconhecido.",
        });
    }

    return reply.status(200).send()
}