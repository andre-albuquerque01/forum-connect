import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middleware/verify-jwt";
import { findByIdComment } from "./find-by-id-comment";
import { updateComment } from "./update-comment";
import { createComment } from "./create-comment";
import { deleteComment } from "./delete-comment";
export async function commentRoutes(app: FastifyInstance) {

    // Authenticate
    app.put('/updateComment/:id', { onRequest: [verifyJwt] }, updateComment)
    app.get('/findByIdComment/:id', { onRequest: [verifyJwt] }, findByIdComment)
    app.post('/createComment', { onRequest: [verifyJwt] }, createComment)
    app.delete('/deleteComment/:id', { onRequest: [verifyJwt] }, deleteComment)
}