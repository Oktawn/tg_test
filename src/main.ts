import { config } from "dotenv";
import express from "express";
import bot from "./bots/bots";
import { dataSource } from "./data-source";
import cors from 'cors';

config();

const PORT = process.env.PORT || 3000
var app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
})

async function main() {
  app.use(express.json());
  app.use(cors());
  dataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
  })
  bot.start();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

}

main();