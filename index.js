const discord = require("discord.js")
const { Client,Collection,Events, GatewayIntentBits,ActivityType, Message, messageLink, TextChannel, Discord,EmbedBuilder} = require('discord.js');


const { prefix ,token } = require('./config.json');


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


client.login(token);