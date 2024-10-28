import express from "express"
import { config as configDotenv } from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"

configDotenv()

const app = express()

app.disable('X-powered-by')
connectDB()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
