import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));



app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser())

import errorHandler from "./middlewares/errorHandler.middlewares.js"; // Path to the errorHandler file





import userRouter from './routes/user.router.js';


app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
    res.send("hello");
});

// this is for API always returns JSON-formatted error messages isted of sending html Error mag
app.use(errorHandler);

export { app };
