import { app } from "./app";
import { env } from "./env";

app.listen({
    host: "0.0.0.0",
    port: env.PORT,
}).then(() => {
    console.log(`🚀 Server running at`);
})

app.get("/", (req, res) => {
    res.send("API rodando na Vercel!");
  });