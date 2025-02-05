import { dataSource } from "@/data-source";
import { UsersEntity } from "@/entity/Users.entity";
import { Composer } from "grammy";


export const setCommand = [
  { command: "start", description: "start bot" },
  { command: "all", description: "all commands" },
  { command: "id", description: "my id" },
  { command: "users", description: "show all users" },
]


export var menuComposer = new Composer()

menuComposer.command("start", async (ctx) => {
  await ctx.reply("Hello");
})

menuComposer.command("all", async (ctx) => {
  await ctx.reply(setCommand.map((x) => `/${x.command} - ${x.description}`).join("\n"))
})

menuComposer.command("id", async (ctx) => {
  await ctx.reply(`Your id: ${ctx.from!.id.toString()}`)
})

menuComposer.command("users", async (ctx) => {
  const users = await dataSource.getRepository(UsersEntity).find();
  await ctx.reply(users.map((user) =>
    `name: ${user.name} email: ${user.email}`
  ).join("\n"))
})