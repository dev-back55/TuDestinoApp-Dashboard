import { config } from "dotenv";
config();


export const BaseUrlApi = process.env.BaseUrlApi || "http://localhost:5001/api";
