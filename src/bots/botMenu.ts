import { Composer } from "grammy";


export const setCommand = [
  { command: "start", description: "start bot" },
  { command: "all", description: "all commands" },
  { command: "me", description: "info about me" },
]


export var menuComposer = new Composer()

menuComposer.command("start", async (ctx) => {
  await ctx.reply("Hello");
})

menuComposer.command("all", async (ctx) => {
  await ctx.reply(JSON.stringify(setCommand))
})

menuComposer.command("me", async (ctx) => {
  await ctx.reply(ctx.from!.id.toString())
})