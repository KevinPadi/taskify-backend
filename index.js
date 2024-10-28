import express from "express"
import { config as configDotenv } from "dotenv"
import connectDB from "./config/db.js"

configDotenv()

const app = express()

app.disable('X-powered-by')
connectDB()
app.use(express.json())

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
