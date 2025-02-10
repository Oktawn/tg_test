import { Conversation, ConversationFlavor, createConversation } from "@grammyjs/conversations";
import { Composer, Context } from "grammy";
import { config } from "dotenv";
import Tiktok from "@tobyg74/tiktok-api-dl";
config();

export var ttComposer = new Composer<ConversationFlavor<Context>>();

const userStatsTiktok = async (conversation: Conversation, ctx: Context) => {
  await ctx.reply("enter username");
  var name = (await conversation.waitFor("message")).message.text;
  try {
    const data = await conversation.external(() => Tiktok.StalkUser(name,
      {
        cookie: process.env.MY_COOKIE,
      }
    ))
    await ctx.reply(Object.entries(data.result.stats).map(([key, value]) => `${key}: ${value}`).join("\n"));
    await ctx.reply(data.result.posts.map((post) =>
      `${post.id} - ${post.desc}`).join("\n"));
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
  await ctx.reply("enter count post");
  var countPost = (await conversation.waitFor("message")).message.text;
  try {
    const data = await conversation.external(() => Tiktok.StalkUser(name,
      {
        cookie: process.env.MY_COOKIE,
        postLimit: Number(countPost),
      }
    ))

    await ctx.reply(data.result.posts?.map((post) =>
      `${post.id} - ${post.desc}`).join("\n"));

  } catch (error) {
    throw new Error(error);
  }
}
ttComposer.use(createConversation(userVideosTiktok));
ttComposer.command("user_videos_tiktok", async (ctx) => {
  await ctx.conversation.enter("userVideosTiktok");
})