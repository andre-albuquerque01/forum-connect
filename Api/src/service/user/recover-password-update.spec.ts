import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryRecoverPassword } from "@/repositories/in-memory/in-memory-recover-password-repository"
import { RecoverPasswordUpdate } from "./recover-password-update"
import { RecoverPasswordSendEmail } from "./recover-password-send-email"

let sut: RecoverPasswordUpdate
let recoverPasswordSendEmail: RecoverPasswordSendEmail
let userRepository: InMemoryUserRepository
let recoverPasswordRepository: InMemoryRecoverPassword

describe('Recover password send email service', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        recoverPasswordRepository = new InMemoryRecoverPassword()
        sut = new RecoverPasswordUpdate(userRepository, recoverPasswordRepository)
        recoverPasswordSendEmail = new RecoverPasswordSendEmail(userRepository, recoverPasswordRepository)
    })

    it("should be able update user password", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const { token } = await recoverPasswordSendEmail.execute({
            email: user.email
        })

        const recover = await sut.execute({
            token,
            password: 'newpassword123',
            passwordConfirmation: 'newpassword123'
        })

        expect(recover.message).toEqual("success")
    })


    it("should not be able found token", async () => {
        await expect(() => sut.execute({
            token: '555',
            password: 'newpassword123',
            passwordConfirmation: 'newpassword123'
        })).rejects.toBeInstanceOf(Error)
    })

    it("should not be able use diferent password", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const { token } = await recoverPasswordSendEmail.execute({
            email: user.email
        })

        await expect(() => sut.execute({
            token,
            password: 'newpassword123',
            passwordConfirmation: 'newpassword12311'
        })).rejects.toBeInstanceOf(Error)
    })
})