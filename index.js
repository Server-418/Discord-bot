const discord = require("discord.js")
const sandbox = require("sandbox")
const { Client,Collection,Events, GatewayIntentBits,ActivityType, Message, messageLink, TextChannel, Discord, EmbedBuilder} = require('discord.js');


const { prefix ,token } = require('./config.json');
const Sandbox = require("sandbox");


const client = new Client({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
});


client.once('ready', () => {
	console.log('bot is ready');
    client.user.setPresence({ activities: [{ name: `being developed`, type: ActivityType.Competing }], status: 'online' });
});


client.on('messageCreate',async (Message) => {
	if(Message.author.bot) {return}
  if(!Message.content.startsWith(prefix)){return}
  const cmd = Message.content.slice(1).split(" ")[0].toLowerCase(); //to remove the prefix and arguments
  const args = Message.content.slice(cmd.length+prefix.length).trim()

  switch (cmd) {
    case "ping": Message.channel.send("pong"); break;
    case "exec": compileCode(args, Message); break;
    default: Message.channel.send("[418] I'm a Teapot!"); break;
  }
});


function compileCode(code, Message) {
  const regexPattern = new RegExp(/`{1,}(.*?)`{1,}/); // Snippet that is wrapped in atleast one backtick ( Discord code block )
  var match = regexPattern.exec(code.replace(/\n/g, " "));
  if (match.length < 1) {Message.channel.send("Please wrap your code in backticks! (```) ")}
  // TODO: Add support for multiple code snippets
  var s = new Sandbox();
  s.run(match[1], function(output) {
  Message.channel.send("result:\n`"+output.result+"`\nconsole:\n[`"+output.console.join(",")+"`]");
  });
}

client.login(token);