import { config } from "dotenv";
import { Bot, GrammyError, HttpError, session } from "grammy";
import { menuComposer, setCommand } from "./menu";

config();

var bot = new Bot(process.env.BOT_TOKEN!.toString());

bot.use(session({ initial: () => ({}) }));
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