import { Conversation, ConversationFlavor, createConversation } from "@grammyjs/conversations";
import { Composer, Context } from "grammy";
import { config } from "dotenv";
import Tiktok from "@tobyg74/tiktok-api-dl";
config();

export var ttComposer = new Composer<ConversationFlavor<Context>>();

const userInfo = async (conversation: Conversation, ctx: Context) => {
  await ctx.reply("enter username");
  var name = (await conversation.waitFor("message")).message.text;
  try {
    const data = await Tiktok.StalkUser(name);
    await ctx.reply(JSON.stringify(data.result));

  } catch (error) {
    throw new Error(error);
  }
}

ttComposer.use(createConversation(userInfo));

ttComposer.command("user_info", async (ctx) => {
  await ctx.conversation.enter("userInfo");
})