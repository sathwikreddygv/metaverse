import express from "express";
import { router } from "./routes/v1";
import dotenv from 'dotenv';
import client from "@metaverse/db/client"
dotenv.config();

const app = express();

app.use("/api/v1", router)

app.listen(process.env.PORT || 3000)