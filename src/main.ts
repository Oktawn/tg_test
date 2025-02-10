import { config } from "dotenv";
import express from "express";
import bot from "./bots/bots";
import { dataSource } from "./data-source";
import type { Request, Response } from 'express';
import { createProxyMiddleware } from "http-proxy-middleware";

config();

const PORT = process.env.PORT || 3000
var app = express();
var proxy = createProxyMiddleware<Request, Response>({
  target: process.env.PROXY_URL,
  changeOrigin: true,
})


async function main() {
  app.use(express.json());
  app.use(proxy);
  dataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
  })
  bot.start();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

}

main();