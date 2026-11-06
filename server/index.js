import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";

const app = express();

// link for express.json() to understand-->https://chatgpt.com/share/6ad9ee82-dcf4-83e8-97da-7257c91e9903
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"https://ai-interview-agent-1-client-p95o.onrender.com",
    credentials:true
}))


app.use("/api/auth" ,authRouter)
app.use("/api/user" ,userRouter)

app.use("/api/interview",interviewRouter)


const PORT = process.env.PORT  || 6000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb()
});
