const discord = require("discord.js")
const sandbox = require("sandbox")
const path = require("path")
const fs = require("fs");
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


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));//filter all the non js files
 for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
  
  
	if (event.once)  {
    
		 client.once(event.name,(...args) =>  event.execute(...args));//execute all the .once events only once
	} 
  else{
    
     client.on(event.name,(...args) =>  event.execute(...args));//else always execute them
    
  }
  
}

client.login(token);