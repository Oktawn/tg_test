import { dataSource } from "@/data-source";
import { UsersEntity } from "@/entity/Users.entity";
import { Conversation, ConversationFlavor, createConversation } from "@grammyjs/conversations";
import { Composer, Context } from "grammy";

export const setCommand = [
  { command: "start", description: "start bot" },
  { command: "all", description: "all commands" },
  { command: "id", description: "my id" },
  { command: "users", description: "show all users" },
  { command: "statistics", description: "show count users" },
  { command: "add", description: "add user" }
]

var userRepository = dataSource.getRepository(UsersEntity);


export var menuComposer = new Composer<ConversationFlavor<Context>>();

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
  var users = await userRepository.find();
  await ctx.reply(users.map((user) =>
    `name: ${user.name} email: ${user.email}`
  ).join("\n"))
})

menuComposer.command("statistics", async (ctx) => {
  var users = await userRepository.find();
  await ctx.reply(`total users: ${users.length}`)
})

async function addUser(conversation: Conversation, ctx: Context) {
  await ctx.reply("enter user");
  var name = (await conversation.waitFor("message:text")).message.text;
  await ctx.reply("enter email");
  var email = (await conversation.waitFor("message:text")).message.text;
  var isUser = await userRepository.findOne({ where: [{ email: email }, { name: name }] });
  if (isUser) {
    await ctx.reply("User already exists")
    return;
  }
  var user = userRepository.create({ name: name, email: email });
  await userRepository.save(user);
  await ctx.reply("User added")
}
menuComposer.use(createConversation(addUser));

menuComposer.command("add", async (ctx) => {
  await ctx.conversation.enter("addUser");
});



// menuComposer.command("add", async (ctx) => {
//   var [_, firstName, lastName, email] = ctx.message!.text!.split(" ");
//   var fullName = `${firstName} ${lastName}`;

//   if (!fullName.trim() || !email) {
//     await ctx.reply("Invalid arguments")
//     return;
//   }
//   try {
//     var isUser = await userRepository.findOne({ where: [{ email: email }, { name: fullName.trim() }] });
//     console.log("isUser", isUser)
//     if (isUser) {
//       await ctx.reply("User already exists")
//       return;
//     }
//     var user = userRepository.create({ name: fullName.trim(), email: email });
//     await userRepository.save(user);
//     await ctx.reply("User added")
//   } catch (error) {
//     new Error(error);
//     console.log(error);
//   }
// })

