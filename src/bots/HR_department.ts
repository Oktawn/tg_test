import { Composer, Context, InlineKeyboard } from "grammy";
import { setCommand } from "./allCommand";
import { Conversation, ConversationFlavor, createConversation } from "@grammyjs/conversations";
import { config } from "dotenv";
config();

setCommand.push({
  command: "day_off",
  description: "заявка на day off"
})

export var HRComposer = new Composer<ConversationFlavor<Context>>();

var inlineKeyboard = new InlineKeyboard()
  .text("Одобрить", "approve")
  .text("Отклонить", "disapprove");

async function getDayOff(conversation: Conversation, ctx: Context) {
  await ctx.reply(' создание заявки на day off');
  await ctx.reply("пример заявки:\n" + "дата:дд.мм.гггг\nруководитель:@username");
  const { message } = await conversation.waitFor("message");

  var newMess = "#заявка_dayOff\n" +
    `сотрудник:@${message.from.username}\n` +
    `${message.text.split("\n")[0]}\n` +
    `${message.text.split("\n")[1]}\n`;

  await ctx.api.sendMessage(process.env.R_CHAT, newMess, {
    reply_markup: inlineKeyboard,
  });
};
HRComposer.use(createConversation(getDayOff));
HRComposer.command("day_off", async (ctx) => {
  await ctx.conversation.enter("getDayOff");
});

HRComposer.on("callback_query", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  const chatId = ctx.callbackQuery.message?.chat.id;
  const messageId = ctx.callbackQuery.message?.message_id;
  const chatBotId = process.env.R2_CHAT
  if (!chatId || !messageId) {
    return;
  }
  var HRMess = "#заявка_dayOff\n" +
    `Заявка сотрудника:@${ctx.callbackQuery.from.username}\n` +
    `на дату: ${ctx.callbackQuery.message.text.split("\n")[2].split(":")[1]}\n` +
    "была";
  var mess = "#заявка_dayOff\n" +
    `Твоя заявка на day off на дату: ${ctx.callbackQuery.message.text.split("\n")[2].split(":")[1]}\n` +
    "была";
  if (callbackData === "approve") {


    await ctx.api.editMessageText(chatId, messageId, HRMess + " одобрена", {
      reply_markup: new InlineKeyboard(),
    });
    await ctx.api.sendMessage(chatBotId, mess + " принята!");

  } else if (callbackData === "disapprove") {
    await ctx.api.editMessageText(chatId, messageId, HRMess + " отклонена", {
      reply_markup: new InlineKeyboard(),
    });

    await ctx.api.sendMessage(chatBotId, mess + " отклонена.");
  }
});