import express from "express";
import dotenv from "dotenv";
dotenv.config()
import { connectDB } from "./db/index.db.js";
import cors from "cors";
import userRouter from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors({
 origin:"http://localhost:3000"
}));
app.use(express.json());

//mongoDB connnection
connectDB()

app.get("/",(req,res) => {
    res.send("Hello from index.js in '/' route")
})

app.use('/api/user',userRouter);//user route
app.use("/api/chat",chatRoute);//chat route

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log("Server is running on PORT:",PORT));
