import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middleware/verify-jwt";
import { createPost } from "./create-post";
import { updatePost } from "./update-post";
import { deletePost } from "./delete-post";
import { fetchRecentPost } from "./fetch-recent-post";
import { searchManyPost } from "./search-manyPost";
import { findByIdPost } from "./find-by-id-post";

export async function postRoutes(app: FastifyInstance) {
    // Public routes
    app.get('/posts/:page', fetchRecentPost)
    app.get('/posts/search/:q/:page', searchManyPost)
    

    // Authenticate
    app.put('/updatePost/:id', { onRequest: [verifyJwt] }, updatePost)
    app.get('/findByIdPost/:id', { onRequest: [verifyJwt] }, findByIdPost)
    app.post('/createPost', { onRequest: [verifyJwt] }, createPost)
    app.delete('/deletePost/:id', { onRequest: [verifyJwt] }, deletePost)
}