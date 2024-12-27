import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { update } from "./update";
import { profile } from "./profile";
import { verifyJwt } from "@/http/middleware/verify-jwt";
import { recoverPassworSendEmail } from "./recover-password-send-email";
import { recoverPassworUpdate } from "./recover-password-update";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)
    app.post('/recover-password', recoverPassworSendEmail)
    app.post('/recover-password-update', recoverPassworUpdate)

    // Authenticate
    app.put('/update', { onRequest: [verifyJwt] }, update)
    app.get('/me', { onRequest: [verifyJwt] }, profile)
}