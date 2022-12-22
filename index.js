const discord = require("discord.js");
const sandbox = require("sandbox");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  Message,
  messageLink,
  TextChannel,
  Discord,
  EmbedBuilder,
} = require("discord.js");

const { prefix, token } = require("./config.json");
const Sandbox = require("sandbox");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const exampleEmbed = client.once("ready", () => {
  console.log("bot is ready");
  client.user.setPresence({
    activities: [{ name: `being developed`, type: ActivityType.Competing }],
    status: "online",
  });
});

let st;

client.on("messageCreate", async (Message) => {
  if (Message.author.bot) {
    return;
  }
  if (!Message.content.startsWith(prefix)) {
    return;
  }
  const cmd = Message.content.slice(1).split(" ")[0].toLowerCase(); //to remove the prefix and arguments
  const args = Message.content.slice(cmd.length + prefix.length).trim();

  switch (cmd) {
    case "ping":
      Message.channel.send({ embeds: [exampleEmbed] });
      break;
    case "exec":
      st = (new Date).getTime();
      compileCode(args, Message);
      break;
    default:
      Message.channel.send("[418] I'm a Teapot!");
      break;
  }
});

function compileCode(code, Message) {
  const regexPattern = new RegExp(/`{1,}(.*?)`{1,}/); // Snippet that is wrapped in atleast one backtick ( Discord code block )
  var match = regexPattern.exec(code.replace(/\n/g, " "));
  if (match.length < 1) {
    Message.channel.send("Please wrap your code in backticks! (```) ");
  }
  // TODO: Add support for multiple code snippets
  var s = new Sandbox();
  s.run(match[1], function (output) {
    let color = 0x32bd00
    if(output.result.includes(" Error ")){
      color = 0xff0000
    }
    let end = (new Date).getTime();
    let time = end - st;
    Message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(color)
          .setTitle("Running code")
          .setDescription("Took "+ `${time/1000}s`)
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png"
          )
          .setTimestamp()
          .addFields({
            name: "Result",
            value: `\`\`\`${output.result}\`\`\``,
          })
          .addFields({
            name: "Output",
            value: `\`\`\`${output.console.join(",")}\`\`\``,
          })
          .setAuthor({
            name: Message.author.username,
            iconURL: Message.author.displayAvatarURL(),
          })
          .setFooter({
            text: "Javascript",
            iconURL:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png",
          }),
      ],
    });

  });
}

client.login(token);

