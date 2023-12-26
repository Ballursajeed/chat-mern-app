import express from "express";
import dotenv from "dotenv";
dotenv.config()
import { connectDB } from "./db/index.db.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

//mongoDB connnection
connectDB()

app.get("/",(req,res) => {
    res.send("Hello from index.js in '/' route")
})

app.listen(PORT, () => console.log("Server is running on PORT:",PORT));
