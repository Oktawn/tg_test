import { Composer, Context } from "grammy";
import { setCommand } from "./allCommand";
import { Conversation, ConversationFlavor, createConversation } from "@grammyjs/conversations";
import { config } from "dotenv";
config();

setCommand.push({
  command: "day_off",
  description: "заявка на day off"
})

export var cardsComposer = new Composer<ConversationFlavor<Context>>();

async function getDayOff(conversation: Conversation, ctx: Context) {
  await ctx.reply(' создание заявки на day off');
  await ctx.reply("пример заявки:\n" + "дата:дд.мм.гггг\nруководитель:@username");
  const { message } = await conversation.waitFor("message");

  var newMess = "#заявка_dayOff\n" +
    `${message.text.split("\n")[0]}\n` +
    `${message.text.split("\n")[1]}\n`;

  await ctx.api.sendMessage(process.env.R_CHAT, newMess);

}

cardsComposer.use(createConversation(getDayOff));

cardsComposer.command("day_off", async (ctx) => {
  await ctx.conversation.enter("getDayOff");
});