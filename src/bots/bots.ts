import { config } from "dotenv";
import { Bot, session } from "grammy";
config()


var bot = new Bot(process.env.BOT_TOKEN!.toString());


bot.command("start", async (ctx) => {
  await ctx.reply("Hello");
});



bot.start();