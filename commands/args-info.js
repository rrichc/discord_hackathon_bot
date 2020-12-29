module.exports = {
  name: "args-info",
  aliases: ["alias1", "alias2"],
  description: "Information about the arguments provided.",
  args: true,
  usage: "<arg1> <arg2>",
  guildOnly: true,
  execute(message, args) {
    if (args[0] === "foo") {
      return message.channel.send("bar");
    }

    message.channel.send(
      `Arguments: ${args}\nArguments length: ${args.length}`,
    );
  },
};
