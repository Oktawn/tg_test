import { config } from "dotenv";
import express from "express";
import bot from "./bots/bots";
config();

const PORT = process.env.PORT || 3000
var app = express();
async function main() {
  app.use(express.json());

  bot.start();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

}

main();