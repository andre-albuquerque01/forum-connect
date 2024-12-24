import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    HOST: z.coerce.string().default('0.0.0.0'),
    NODE_ENV: z.enum(["dev", "prod", "test"]).default('dev'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    MAIL_AUTH_USER: z.string(),
    MAIL_AUTH_PASSWORD: z.string(),
    MAIL_HOST: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
    console.error("❌ Invalid environment variables", _env.error.format())
    throw new Error('❌ Invalid environment variables')
}

export const env = _env.data
