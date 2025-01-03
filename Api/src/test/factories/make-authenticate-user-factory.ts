import { MakeUserFactory } from "@/test/factories/make-user-factory"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function makeAuthenticateUserFactory(app: FastifyInstance) {
    const user = await MakeUserFactory.create({})

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: user.email,
            password: user.password,
        })

    const { token } = authResponse.body

    return { token }
}