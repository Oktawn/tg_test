import { config } from "dotenv";
import { Bot, GrammyError, HttpError, session } from "grammy";
import { menuComposer } from "./menu";
import { conversations } from "@grammyjs/conversations";
import { setCommand } from "./allCommand";
config();
var bot = new Bot(process.env.BOT_TOKEN as string);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.api.setMyCommands(setCommand);
bot.use(menuComposer);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`); const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

export default bot;