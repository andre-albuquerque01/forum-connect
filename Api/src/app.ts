import fastify from "fastify";
import { userRoutes } from "./http/controllers/users/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { ZodError } from "zod";
import { postRoutes } from "./http/controllers/posts/routes";
import { commentRoutes } from "./http/controllers/comments/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: '1d' },
})

app.register(userRoutes)
app.register(postRoutes)
app.register(commentRoutes)


app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error.', issues: error.format()
        })
    }

    if (env.NODE_ENV !== "prod") {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})