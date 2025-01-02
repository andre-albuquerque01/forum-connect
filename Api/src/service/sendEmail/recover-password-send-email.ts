import { env } from "@/env";
import { RecoverPasswordHtml, RecoverPasswordText } from "@/utils/recover-password-html-text";

interface RecoverPasswordProps {
  email: string;
  token: string;
}

export async function SendEmail({ email, token}: RecoverPasswordProps) { 
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: env.MAIL_AUTH_USER,
          pass: env.MAIL_AUTH_PASSWORD,
        },
      });

      const html = RecoverPasswordHtml(token)
      const text = RecoverPasswordText(token)

      await transporter.sendMail({
          from: '"Forum node 👻" <sistemadegereciamentos@gmail.com>',
          to: email,
          subject: "Recuperação de senha",
          text,
          html,
      });
}
