import { config } from "dotenv";
import { Bot } from "grammy";
import { menuComposer, setCommand } from "./botMenu";
config();


var bot = new Bot(process.env.BOT_TOKEN!.toString());

bot.api.setMyCommands(setCommand);
bot.use(menuComposer);

export default bot;