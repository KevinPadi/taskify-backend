import express, { json } from "express"
import { config as configDotenv } from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authRouter } from "./routes/user_router.js"
import { boardsRouter } from "./routes/board_router.js"
import { listRouter } from "./routes/list_router.js"
import { cardRouter } from "./routes/card_router.js"

configDotenv()

const app = express()

app.disable('X-powered-by')
connectDB()

app.use(json())
app.use(
  cors({
    credentials: true
  })
)
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api', boardsRouter)
app.use('/api', listRouter)
app.use('/api', cardRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
