import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { RecoverPasswordSendEmail } from "./recover-password-send-email"
import { InMemoryRecoverPassword } from "@/repositories/in-memory/in-memory-recover-password-repository"

let sut: RecoverPasswordSendEmail
let userRepository: InMemoryUserRepository
let recoverPasswordRepository: InMemoryRecoverPassword

describe('Recover password send email service', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        recoverPasswordRepository = new InMemoryRecoverPassword()
        sut = new RecoverPasswordSendEmail(userRepository, recoverPasswordRepository)
    })

    it("should be able send email to user", async () => {
        const user  = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const { token } = await sut.execute({
            email: user.email
        })

        expect(token).toEqual(expect.any(String))
    })


    it("should be able not found", async () => {
        await expect(() => sut.execute({
            email: '1'
        })).rejects.toBeInstanceOf(Error)
    })
})