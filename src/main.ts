import { config } from "dotenv";
import express from "express";

config();

const PORT = process.env.PORT || 3000
var app = express();
async function main() {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

}

main();