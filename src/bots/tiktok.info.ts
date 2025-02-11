import { Conversation, ConversationFlavor, createConversation } from "@grammyjs/conversations";
import { Composer, Context } from "grammy";
import { config } from "dotenv";
import Tiktok from "@tobyg74/tiktok-api-dl";
config();

export var ttComposer = new Composer<ConversationFlavor<Context>>();

const userInfoTiktok = async (conversation: Conversation, ctx: Context) => {
  await ctx.reply("enter username");
  var name = (await conversation.waitFor("message")).message.text;
  try {
    const data = await conversation.external(() => Tiktok.StalkUser(name))
    await ctx.reply(Object.entries(data.result.users).map(([key, value]) => `${key}: ${value}`).join("\n"));
  } catch (error) {
    throw new Error(error);
  }
};

ttComposer.use(createConversation(userInfoTiktok));
ttComposer.command("user_info_tiktok", async (ctx) => {
  await ctx.conversation.enter("userInfoTiktok");
})

const userStatsTiktok = async (conversation: Conversation, ctx: Context) => {
  await ctx.reply("enter username");
  var name = (await conversation.waitFor("message")).message.text;
  try {
    const data = await conversation.external(() => Tiktok.StalkUser(name))
    await ctx.reply(Object.entries(data.result.stats).map(([key, value]) => `${key}: ${value}`).join("\n"));
  } catch (error) {
    throw new Error(error);
  }
}
ttComposer.use(createConversation(userStatsTiktok));
ttComposer.command("user_stats_tiktok", async (ctx) => {
  await ctx.conversation.enter("userStatsTiktok");
})

const userVideosTiktok = async (conversation: Conversation, ctx: Context) => {
  await ctx.reply("enter username");
  var name = (await conversation.waitFor("message")).message.text;
  try {
    const data = await conversation.external(() => Tiktok.StalkUser(name));
    var posts = data.result.posts.slice(0, 20);
    await ctx.reply(posts?.map((post) =>
      `${post.id} - ${post.desc}`).join("\n"));

  } catch (error) {
    throw new Error(error);
  }
}
ttComposer.use(createConversation(userVideosTiktok));
ttComposer.command("user_videos_tiktok", async (ctx) => {
  await ctx.conversation.enter("userVideosTiktok");
})