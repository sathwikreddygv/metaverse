import express from "express";
import { router } from "./routes/v1";
import dotenv from 'dotenv';
import client from "@metaverse/db/client"
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", router)

app.listen(process.env.PORT || 3000)