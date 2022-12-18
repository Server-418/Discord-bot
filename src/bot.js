import {fs} from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Client } from 'discord.js';
import { Intents } from 'discord.js'; //tried { Client, Intents } didn't work :(
import childProcess from 'child_process';
import { TextChannel } from 'discord.js';


const exec = promisify(childProcess.exec);
const token = '';




//creating a client, with intent
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,  Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

//when client ready, get msg stream and check conditions below

client.on('ready', () => {
	(client.channels.cache.get('1054037938335391805')).send({
		content: 'Hey, i\'m online',
	}); //saying it
});

client.on('message', (msg) => {
	if (msg.content.toLowerCase() === 'hello') {
		msg.reply(`${msg.author} World!`);
	}

	if (msg.content.startsWith('!compile')) {
		const code = msg.content;
		compile(msg, code);
	}

	
});

const compile = (msg,  c) => {
	// msg.reply(`${msg.author} ${c}`)
	c = c.replace('!compile ', '');

	try {
		// eslint-disable-next-line no-undef
		fs.writeFileSync(`${__dirname}/compile.js`, c);
		msg.reply('compiling...');

		const response = exec_code();
		response
			.then((data) => {
				console.log(data);
				msg.reply('`' + `${data.toString()}` + '`');
			})
			.catch((err) => {
				msg.reply(`Error: ${err}`);
			});
	} catch (err) {
		console.error(err);
	}
};

//exec_code will execute the code received by msg using exec() and returns output
async function exec_code() {
	// Exec output contains both stderr and stdout outputs
	// const chenge_dir = await exec('cd dist');
	const command = await exec('node src/compile.js');
	//we take only stdout
	return command.stdout.trim();
}

client.login(token);
